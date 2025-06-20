'use client';
import { useRef, useEffect, useState } from 'react';
import { toPng } from 'html-to-image';
import { Download, Loader2 } from 'lucide-react';

const CertificateTemplate = ({ studentData }) => {
  const certificateRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [certificateUrl, setCertificateUrl] = useState('');
  const [hasDownloaded, setHasDownloaded] = useState(false);

  useEffect(() => {
    if (studentData) {
      generateCertificate();
    }
  }, [studentData]);

  const generateCertificate = async () => {
    if (!certificateRef.current) return;

    setIsGenerating(true);
    try {
      const dataUrl = await toPng(certificateRef.current, {
        quality: 1,
        pixelRatio: 3,
        cacheBust: true,
        backgroundColor: '#fff9f9'
      });
      setCertificateUrl(dataUrl);
    } catch (error) {
      console.error('Error generating certificate:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if (certificateUrl && !isGenerating && !hasDownloaded) {
      downloadCertificate(certificateUrl);
      setHasDownloaded(true);
    }
  }, [certificateUrl, isGenerating, hasDownloaded]);

  const downloadCertificate = (data = certificateUrl) => {
    if (!data) return;

    const link = document.createElement('a');
    link.download = `Balaji_Training_Certificate_${studentData.panNumber}.png`;
    link.href = data;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!studentData) return null;

  return (
    <div className="mt-8 w-full">
      {/* Certificate template container */}
      <div className="w-full flex justify-center">
        <div 
          ref={certificateRef}
          className="bg-white"
          style={{
            width: '210mm',
            minHeight: '297mm',
            position: 'relative',
            padding: '40px 50px',
            boxSizing: 'border-box',
            fontFamily: "'Times New Roman', serif",
            background: '#fff9f9',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            margin: '0 auto',
            lineHeight: '1.5'
          }}
        >
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <img 
              src="/balaji-logo.png"
              alt="Balaji Shikshan Sansthan Samiti"
              style={{ height: '80px', marginBottom: '15px' }}
            />
            <h1 style={{ 
              fontSize: '24px',
              fontWeight: 'bold',
              marginBottom: '5px',
              textDecoration: 'underline',
              color: '#8B0000'
            }}>
              BALAJI SHIKSHAN SANSTHAN SAMITI
            </h1>
            <h2 style={{ 
              fontSize: '20px',
              fontWeight: 'bold',
              marginBottom: '30px'
            }}>
              25 Hrs Training Completion Certificate (Online)
            </h2>
          </div>

          {/* Main Content */}
          <div style={{ 
            textAlign: 'center',
            fontSize: '18px',
            margin: '0 auto',
            maxWidth: '90%'
          }}>
            <p>This is to certify that</p>
            
            <div style={{
              margin: '25px 0',
              fontSize: '22px',
              fontWeight: 'bold',
              textDecoration: 'underline',
              minHeight: '30px'
            }}>
              {studentData.name.toUpperCase()}
            </div>

            <p>has successfully completed twenty-five hours training</p>
            <p>through the online mode by</p>
            
            <p style={{ 
              fontWeight: 'bold', 
              margin: '15px 0',
              lineHeight: '1.4'
            }}>
              Balaji Shikshan Sansthan Samiti,<br />
              using the portal www.balajitraining.in
            </p>

            <p>for Life Insurance from</p>

            <p style={{ 
              fontWeight: 'bold', 
              margin: '15px 0',
              lineHeight: '1.4'
            }}>
              {studentData.startDate} to {studentData.endDate}
            </p>

            <div style={{ 
              margin: '30px 0',
              lineHeight: '1.6'
            }}>
              <p><strong>Branch:</strong> {studentData.branch}</p>
              <p><strong>LIC Registration No:</strong> {studentData.licRegdNumber}</p>
            </div>

            <p style={{ margin: '30px 0 15px' }}>
              The Candidate is sponsored/forwarded by:
            </p>

            <p style={{ 
              fontWeight: 'bold', 
              fontSize: '20px', 
              marginBottom: '30px'
            }}>
              LIC OF INDIA
            </p>
          </div>

          {/* Footer Section */}
          <div style={{
            marginTop: '40px',
            fontSize: '16px',
            lineHeight: '1.5'
          }}>
            <p style={{ marginBottom: '15px' }}>
              Balaji Shikshan Sansthan Samiti is an Accredited Institute for Life Insurance Agent's
              Training by Life Insurance Corporation of India by
            </p>
            <p style={{ 
              fontWeight: 'bold', 
              margin: '10px 0',
              lineHeight: '1.4'
            }}>
              Reference Number CO/MKTG/FFT/PRT.
            </p>
            <p style={{ marginBottom: '30px' }}>
              This Approval is Valid Up to 30 June 2027.
            </p>

            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              flexWrap: 'wrap',
              marginBottom: '20px'
            }}>
              <div style={{ minWidth: '120px' }}>
                <p><strong>PAN NUMBER:</strong></p>
                <p style={{ fontWeight: 'bold' }}>{studentData.panNumber}</p>
              </div>
              <div style={{ minWidth: '120px' }}>
                <p><strong>CERTIFICATE REF.:</strong></p>
                <p style={{ fontWeight: 'bold' }}>BS{studentData.srNo?.toString().padStart(4, '0')}</p>
              </div>
              <div style={{ minWidth: '120px' }}>
                <p><strong>SR. NO.:</strong></p>
                <p style={{ fontWeight: 'bold' }}>{studentData.srNo}</p>
              </div>
            </div>

            {/* Signature Area */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '60px',
              alignItems: 'flex-end',
              flexWrap: 'wrap'
            }}>
              <div style={{ 
                textAlign: 'center', 
                marginBottom: '20px',
                flex: 1,
                minWidth: '200px'
              }}>
                <div style={{ 
                  height: '80px', 
                  marginBottom: '10px',
                  display: 'flex',
                  justifyContent: 'center'
                }}>
                  <img 
                    src="/signature.png"
                    alt="Authorized Signature"
                    style={{ height: '100%', objectFit: 'contain' }}
                  />
                </div>
                <div style={{ 
                  borderTop: '1px solid #000', 
                  width: '200px', 
                  margin: '0 auto' 
                }}></div>
                <p style={{ marginTop: '5px' }}>RENHA KOHLI</p>
              </div>

              <div style={{ 
                textAlign: 'center', 
                marginBottom: '20px',
                flex: 1,
                minWidth: '200px'
              }}>
                <div style={{ 
                  height: '80px', 
                  marginBottom: '10px',
                  display: 'flex',
                  justifyContent: 'center'
                }}>
                  <img 
                    src="/stamp.png"
                    alt="Official Stamp"
                    style={{ 
                      height: '100%', 
                      objectFit: 'contain',
                      maxWidth: '150px'
                    }}
                  />
                </div>
                <p>Official Stamp</p>
              </div>
            </div>

            {/* Verification Link */}
            <div style={{ 
              marginTop: '40px',
              textAlign: 'center',
              fontSize: '14px'
            }}>
              <p>You can verify training details at:</p>
              <p>https://balajitraining.in/verify-certificate/</p>
            </div>

            {/* Address */}
            <div style={{ 
              marginTop: '20px',
              textAlign: 'center',
              fontSize: '12px'
            }}>
              <p>Regd. Office: 523, MAKSH2001/48 Plaza, 9F Post, Manmanur, Jaipur - 300020 (Raj)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Download Controls */}
      <div className="flex justify-center mt-6 gap-4">
        <button
          onClick={() => downloadCertificate()}
          disabled={!certificateUrl || isGenerating}
          className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 animate-spin" size={18} />
              Generating...
            </>
          ) : (
            <>
              <Download className="mr-2" size={18} />
              Download Certificate
            </>
          )}
        </button>
      </div>

      {/* Preview */}
      {certificateUrl && (
        <div className="mt-8 w-full">
          <h3 className="text-lg font-medium mb-2 text-center">Certificate Preview</h3>
          <div className="flex justify-center">
            <div className="border rounded-lg overflow-hidden shadow-md max-w-full">
              <img 
                src={certificateUrl} 
                alt="Certificate Preview" 
                className="w-full h-auto max-w-full"
                style={{ maxHeight: '500px', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificateTemplate;