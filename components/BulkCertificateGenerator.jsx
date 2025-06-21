'use client'
import React, { useState, useEffect } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { Loader2, Download, AlertCircle, Check } from 'lucide-react';
import { useApi } from '@/context/api-context';
import CertificateTemplate from './CertificateTemplate';

const BulkCertificateGenerator = ({ setSuccessMessage, setErrorMessage }) => {
  const { getAllStudents } = useApi();
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch all students
  const fetchStudents = async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await getAllStudents();
      setStudents(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch students');
    } finally {
      setIsLoading(false);
    }
  };

  // Generate certificates and create ZIP
  const generateBulkCertificates = async () => {
    if (students.length === 0) {
      setError('No students found. Please fetch students first.');
      return;
    }

    setIsLoading(true);
    setProgress(0);
    setStatus('Preparing certificates...');
    setError('');
    setSuccess('');

    // Create a container for rendering
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.left = '0';
    container.style.top = '0';
    container.style.width = '210mm';
    container.style.height = '297mm';
    container.style.visibility = 'visible';
    container.style.opacity = '1';
    container.style.zIndex = '9999';
    document.body.appendChild(container);

    const { createRoot } = await import('react-dom/client');
    const root = createRoot(container);

    try {
      const zip = new JSZip();
      const certificateFolder = zip.folder('certificates');
      const totalStudents = students.length;
      let generatedCount = 0;

      // Preload fonts
      await document.fonts.ready;

      for (let i = 0; i < totalStudents; i++) {
        const student = students[i];
        setStatus(`Generating certificate for ${student.name} (${i + 1}/${totalStudents})`);

        await new Promise(async (resolve) => {
          try {
            // Render the certificate
            root.render(<CertificateTemplate studentData={student} />);

            // Wait for rendering to complete
            await new Promise(r => setTimeout(r, 300));

            // Get the rendered element
            const certificateElement = container.firstChild;
            if (!certificateElement) {
              throw new Error('Certificate element not rendered');
            }

            // Force layout calculation
            certificateElement.offsetHeight;

            // Generate PNG
            const { toPng } = await import('html-to-image');
            const dataUrl = await toPng(certificateElement, {
              quality: 1,
              pixelRatio: 2,
              cacheBust: true,
              backgroundColor: '#fff9f9'
            });

            // Add to ZIP
            certificateFolder.file(
              `Balaji_Training_Certificate_${student.panNumber}.png`,
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

      // Generate ZIP file
      setStatus('Creating ZIP file...');
      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, 'Balaji_Training_Certificates.zip');
      
      setSuccess(`Successfully generated ${generatedCount} of ${totalStudents} certificates`);
      setStatus('');
    } catch (err) {
      console.error('Error generating bulk certificates:', err);
      setError(err.message || 'Failed to generate certificates');
    } finally {
      // Clean up
      root.unmount();
      document.body.removeChild(container);
      setIsLoading(false);
      setProgress(0);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="space-y-6">
      {/* Student Count */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h2 className="font-medium text-blue-800">Students Found</h2>
        <p className="text-2xl font-bold text-blue-900 mt-1">
          {students.length} {students.length === 1 ? 'student' : 'students'}
        </p>
        <button
          onClick={fetchStudents}
          disabled={isLoading}
          className="mt-2 text-sm text-blue-600 hover:text-blue-800 disabled:opacity-50"
        >
          Refresh List
        </button>
      </div>

      {/* Progress Display */}
      {isLoading && (
        <div className="space-y-2">
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
        </div>
      )}

      {/* Action Button */}
      <div className="flex justify-center">
        <button
          onClick={generateBulkCertificates}
          disabled={isLoading || students.length === 0}
          className="flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium disabled:opacity-50 w-full max-w-md"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 animate-spin" size={18} />
              Generating...
            </>
          ) : (
            <>
              <Download className="mr-2" size={18} />
              Generate All Certificates ({students.length})
            </>
          )}
        </button>
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

      {/* Sample Preview - Fixed at bottom */}
      <div className="mt-8 border-t pt-6">
        <h3 className="text-lg font-medium mb-4 text-center">Certificate Sample Preview</h3>
        <div className="flex justify-center">
          <div className="border rounded-lg overflow-hidden shadow-md w-full max-w-2xl">
            <div className="bg-white p-4">
              <div className="text-center mb-6">
                <h1 className="text-xl font-bold text-red-800 underline mb-1">
                  BALAJI SHIKSHAN SANSTHAN SAMITI
                </h1>
                <h2 className="text-lg font-bold">
                  25 Hrs Training Completion Certificate (Online)
                </h2>
              </div>
              
              <div className="text-center space-y-4">
                <p>This is to certify that</p>
                <p className="text-xl font-bold underline">SAMPLE STUDENT NAME</p>
                <p>has successfully completed twenty-five hours training</p>
                <p>through the online mode by</p>
                <p className="font-bold">Balaji Shikshan Sansthan Samiti</p>
                <p>using the portal www.balajitraining.in</p>
                <p>for Life Insurance from</p>
                <p className="font-bold">01-01-2023 to 05-01-2023</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkCertificateGenerator;