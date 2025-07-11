'use client'
import React, { useState, useEffect, useRef } from 'react';
import JSZip from 'jszip';
import { Loader2, Download, AlertCircle, Check, X, RefreshCw } from 'lucide-react';
import CertificateTemplate from './CertificateTemplate';
import { useApi } from '@/context/api-context';

const BulkCertificateGenerator = ({ setSuccessMessage, setErrorMessage }) => {
  const { student } = useApi();
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [zipBlob, setZipBlob] = useState(null);
  const [useLastUploaded, setUseLastUploaded] = useState(false); // New state for toggle
  const cancelRef = useRef(false);

  const fetchStudents = async () => {
    setIsFetching(true);
    setError('');
    try {
      const data = useLastUploaded 
        ? await student.getLastUploaded() 
        : await student.getAll();
      
      if (data && Array.isArray(data)) {
        setStudents(data);
      } else {
        throw new Error('Invalid data format received');
      }
    } catch (err) {
      console.error('Fetch students error:', err);
      setError(err.message || 'Failed to fetch students');
      setStudents([]);
    } finally {
      setIsFetching(false);
    }
  };

  // Toggle between all students and last uploaded
  const toggleLastUploaded = () => {
    setUseLastUploaded(!useLastUploaded);
  };

  useEffect(() => {
    fetchStudents();
  }, [useLastUploaded]); // Refetch when toggle changes

    const cancelGeneration = () => {
    cancelRef.current = true;
    setIsLoading(false);
    setError('Certificate generation cancelled');
    setStatus('');
  };

  const generateBulkCertificates = async () => {
    if (students.length === 0) {
      setError('No students found. Please fetch students first.');
      return;
    }

    cancelRef.current = false;
    setIsLoading(true);
    setProgress(0);
    setStatus('Preparing certificates...');
    setError('');
    setSuccess('');
    setZipBlob(null);

    try {
      const zip = new JSZip();
      const certificateFolder = zip.folder('certificates');
      const totalStudents = students.length;
      let generatedCount = 0;

      // Create a temporary container for rendering
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.width = '794px'; // A4 width in pixels
      container.style.height = 'auto';
      document.body.appendChild(container);
      const { createRoot } = await import('react-dom/client');
      const root = createRoot(container);

      // Wait for fonts to load
      await document.fonts.ready;

      for (let i = 0; i < totalStudents; i++) {
        if (cancelRef.current) break;

        const student = students[i];
        setStatus(`Generating certificate for ${student.name} (${i + 1}/${totalStudents})`);

        await new Promise(async (resolve) => {
          try {
            root.render(<CertificateTemplate studentData={student} />);
            await new Promise(r => setTimeout(r, 100));

            const certificateElement = container.firstChild;
            if (!certificateElement) {
              throw new Error('Certificate element not rendered');
            }

            certificateElement.style.height = '297mm';

            const { toPng } = await import('html-to-image');
            const dataUrl = await toPng(certificateElement, {
              quality: 0.6, // Slightly better quality
              pixelRatio: 1.2, // Better resolution
              backgroundColor: 'white',
              cacheBust: true,
            });

            certificateFolder.file(
              `Certificate_${student.name.replace(/\s+/g, '_')}.png`,
              dataUrl.split(',')[1],
              { base64: true }
            );

            generatedCount++;
          } catch (err) {
            console.error(`Error generating certificate for ${student.name}:`, err);
          } finally {
            setProgress(Math.round(((i + 1) / totalStudents) * 100));
            resolve();
          }
        });
      }

      root.unmount();
      document.body.removeChild(container);

      if (!cancelRef.current && generatedCount > 0) {
        setStatus('Creating ZIP file...');
        const content = await zip.generateAsync({ 
          type: 'blob',
          compression: 'DEFLATE',
          compressionOptions: { level: 6 }
        });
        setZipBlob(content);
        
        setSuccess(`Successfully generated ${generatedCount} certificates. Ready to download.`);
      } else if (generatedCount === 0) {
        setError('No certificates were generated');
      }
    } catch (err) {
      console.error('Error generating bulk certificates:', err);
      setError(err.message || 'Failed to generate certificates');
    } finally {
      setStatus('');
      setIsLoading(false);
      setProgress(0);
    }
  };

  const downloadZip = () => {
    if (zipBlob) {
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Balaji_Training_Certificates.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  useEffect(() => {
    fetchStudents();
    return () => {
      cancelRef.current = true;
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Mode Toggle and Student Count */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="font-medium text-blue-800">
                {useLastUploaded ? 'Last Uploaded Students' : 'All Students'}
              </h2>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={useLastUploaded}
                  onChange={toggleLastUploaded}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                <span className="ml-2 text-sm font-medium text-gray-700">
                  {useLastUploaded ? 'Last Upload' : 'All Data'}
                </span>
              </label>
            </div>
            <p className="text-2xl font-bold text-blue-900">
              {students.length} {students.length === 1 ? 'student' : 'students'}
            </p>
          </div>
          <button
            onClick={fetchStudents}
            disabled={isFetching}
            className="flex items-center text-sm text-blue-600 hover:text-blue-800 disabled:opacity-50"
          >
            {isFetching ? (
              <Loader2 className="mr-1 h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="mr-1 h-4 w-4" />
            )}
            Refresh
          </button>
        </div>
      </div>

      {/* Progress Display */}
      {isLoading && (
        <div className="space-y-4">
          <div className="flex justify-between text-sm text-gray-600">
            <span>{status || 'Processing...'}</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <button
            onClick={cancelGeneration}
            className="flex items-center justify-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm"
          >
            <X className="mr-2" size={16} />
            Cancel Generation
          </button>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 flex-wrap">
        <button
          onClick={generateBulkCertificates}
          disabled={isLoading || students.length === 0}
          className="flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium disabled:opacity-50 flex-1 max-w-md"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 animate-spin" size={18} />
              Generating...
            </>
          ) : (
            <>
              <Download className="mr-2" size={18} />
              Generate Certificates ({students.length})
            </>
          )}
        </button>

        {zipBlob && (
          <button
            onClick={downloadZip}
            className="flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex-1 max-w-md"
          >
            <Download className="mr-2" size={18} />
            Download ZIP File
          </button>
        )}
      </div>

      {/* Status Messages */}
      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded-lg flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-3 bg-green-100 text-green-700 rounded-lg flex items-start">
          <Check className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* Static Certificate Preview - Made more compact */}
      <div className="mt-8 border-t pt-6">
        <h3 className="text-lg font-medium mb-4 text-center">Certificate Design Preview</h3>
        <div className="flex justify-center">
          <div className="bg-white shadow-sm" style={{ maxWidth: '794px', overflow: 'hidden' }}>
            <CertificateTemplate 
              studentData={{
                name: "Sample Student",
                panNumber: "ABCDE1234F",
                licRegdNumber: "LIC123456",
                branch: "Sample Branch",
                srNo: 1,
                startDate: "01-01-2023",
                endDate: "05-01-2023"
              }} 
              isPreview={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkCertificateGenerator;