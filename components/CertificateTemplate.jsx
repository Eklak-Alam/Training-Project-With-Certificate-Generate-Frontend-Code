'use client';
import { useRef, useEffect, useState } from 'react';
import { Download, Loader2 } from 'lucide-react';

const CertificateTemplate = ({ studentData }) => {
  const certificateRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // useEffect(() => {
  //   if (studentData) {
  //     generateCertificate();
  //   }
  // }, [studentData]);


  // Helper function to convert PNG to JPEG
const convertToJpeg = async (dataUrl, quality = 0.7) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.src = dataUrl;
  });
};


  const generateCertificate = async () => {
  if (!certificateRef.current) return;

  setIsGenerating(true);
  try {
    // Create temporary container
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.width = '210mm';
    tempContainer.style.height = '297mm';
    document.body.appendChild(tempContainer);

    // Clone the certificate node
    const clonedNode = certificateRef.current.cloneNode(true);
    tempContainer.appendChild(clonedNode);

    // Wait for assets to load
    await Promise.all([
      loadImage('/logo.png'),
      loadImage('/stamp.png'),
      loadImage('/sign2.png'),
      document.fonts.ready
    ]);

    // Force layout calculation
    clonedNode.offsetHeight;
    await new Promise(resolve => setTimeout(resolve, 500));

    const { toPng } = await import('html-to-image');
    const dataUrl = await toPng(clonedNode, {
      quality: 0.5, // Reduced from 1.0 to 0.8 (20% size reduction)
      pixelRatio: 1, // Reduced from 3 to 2 (33% size reduction)
      backgroundColor: '#ffffff',
      cacheBust: true,
      style: {
        width: '210mm',
        height: '297mm',
        backgroundColor: '#ffffff',
      },
      filter: (node) => {
        // Exclude any hidden elements
        return node.style?.display !== 'none';
      }
    });

    // Additional optimization - convert to JPEG if possible
    const optimizedDataUrl = await convertToJpeg(dataUrl, 0.7);
    
    downloadCertificate(optimizedDataUrl);
    document.body.removeChild(tempContainer);
  } catch (error) {
    console.error('Error generating certificate:', error);
  } finally {
    setIsGenerating(false);
  }
};



  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = resolve;
      img.onerror = (e) => {
        console.error(`Failed to load image: ${src}`);
        reject(e);
      };
    });
  };

  const downloadCertificate = (data) => {
    const link = document.createElement('a');
    link.download = `Balaji_Certificate_${studentData.name}.png`;
    link.href = data;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!studentData) return null;

  return (
     <div className="w-full">
      <div 
        ref={certificateRef}
        style={{
          width: '210mm',
          height: '297mm',
          padding: '15px 25px',
          boxSizing: 'border-box',
          fontFamily: "'Times New Roman', serif",
          background: 'white',
          margin: '0 auto',
          lineHeight: '1.3',
          position: 'relative',
          overflow: 'hidden',
          border: '15px solid #d4a76a',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Decorative border */}
        <div style={{
          position: 'absolute',
          top: '15px',
          left: '15px',
          right: '15px',
          bottom: '15px',
          border: '4px solid #c19a65',
          pointerEvents: 'none'
        }}></div>

        {/* Header Section - Made more compact */}
        <div style={{ flex: '0 0 auto' }}>
          <div style={{ 
            textAlign: 'center',
            marginBottom: '5px',
            marginTop: '50px'
          }}>
            <img 
              src="/logo2.webp" 
              alt="Organization Logo"
              style={{
                height: '90px',
                width: 'auto',
                margin: '0 auto'
              }}
            />
          </div>

          <div style={{ 
            textAlign: 'center',
            marginBottom: '10px'
          }}>
            <h1 style={{ 
              fontSize: '35px',
              fontWeight: 'bold',
              marginBottom: '3px',
              textDecoration: 'underline',
              color: '#8B0000'
            }}>
              BALAJI SHIKSHAN SANSTHAN SAMITI
            </h1>
            <h2 style={{ 
              fontSize: '22px',
              fontWeight: 'bold',
              color: '#333',
              marginTop: '20px'
            }}>
              Training Completion Certificate (Online)
            </h2>
          </div>
        </div>

        {/* Main Content - Adjusted spacing */}
        <div style={{ 
          flex: '1 1 auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: 'center',
          fontSize: '25px',
          margin: '5px auto',
          maxWidth: '95%'
        }}>
          <p>This is to certify that <strong>Mr/Mrs/Miss</strong></p>
          
          <div style={{
            margin: '12px 0',
            fontSize: '27px',
            fontWeight: 'bold',
            color: 'black',
            minHeight: '26px'
          }}>
            {studentData.name?.toUpperCase()}
          </div>

          <div style={{ marginBottom: '12px' }}>
            <p>has successfully completed twenty-five hours training through</p>
            <p>the online mode by Balaji Shikshan Sansthan Samiti,</p>
            <p>using the portal www.balajitraining.in for Life Insurance from</p>
          </div>

          <p style={{ 
            fontWeight: 'bold', 
            margin: '10px 0',
            fontSize: '25px'
          }}>
            {studentData.startDate} to {studentData.endDate}
          </p>

          <p style={{ margin: '12px 0 8px' }}>
            The Candidate is sponsored/forwarded by:
          </p>

          <p style={{ 
            fontWeight: 'bold', 
            fontSize: '18px', 
            marginBottom: '15px',
            color: '#8B0000'
          }}>
            LIC OF INDIA
          </p>
        </div>

        {/* Footer Section - Made more compact */}
        <div style={{
          flex: '0 0 auto',
          marginTop: 'auto',
          fontSize: '14px',
          lineHeight: '1.3'
        }}>
          <div style={{
            textAlign: 'center',
            padding: '20px 10px',
            marginTop: '30px',
            maxWidth: '800px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            <p style={{
              marginBottom: '16px',
              color: '#8B0000',
              fontSize: '18px',
              fontWeight: 'bold',
            }}>
              Balaji Shikshan Sansthan Samiti
            </p>

            <p style={{
              fontSize: '16px',
              lineHeight: '1.6',
              color: '#333',
              padding: '0 20px',
            }}>
              is an Accredited Institute for Life Insurance Agent's Training by Life Insurance Corporation of India by Reference Number <strong>CO/MKTG/FPT/PRT</strong>. This approval is valid up to <strong>30 June 2027</strong>.
            </p>
          </div>


          {/* Student info grid */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '8px',
            marginBottom: '12px',
            fontSize: '14px'
          }}>
            <div>
              <p><strong>PAN NUMBER:</strong> {studentData.panNumber}</p>
              <p><strong>LIC REGD:</strong> {studentData.licRegdNumber}</p>
            </div>
            <div>
              <p><strong>BRANCH:</strong> {studentData.branch}</p>
              <p><strong>CERTIFICATE REF.:</strong> BS{studentData.srNo?.toString().padStart(4, '0')}</p>
            </div>
          </div>

          {/* Signature and Stamp Section */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '15px',
            alignItems: 'flex-end'
          }}>
            <div style={{ 
              textAlign: 'left',
              width: '180px'
            }}>
              <div style={{ 
                height: '60px',
                marginBottom: '5px',
                display: 'flex',
                justifyContent: 'flex-start'
              }}>
                <img 
                  src="/sign2.png" 
                  alt="Signature"
                  style={{
                    height: '55px',
                    width: 'auto',
                    maxWidth: '150px'
                  }}
                />
              </div>
              <p style={{ 
                fontWeight: 'bold',
                borderTop: '1px solid #000',
                paddingTop: '2px',
                width: '170px',
                fontSize: '15px'
              }}>
                Suresh Kumar Mahawar
              </p>
              <p style={{ fontSize: '14px' }}>In Charge</p>
            </div>

            <div style={{ 
              textAlign: 'right',
              width: '180px'
            }}>
              <div style={{ 
                height: '60px',
                marginBottom: '5px',
                display: 'flex',
                justifyContent: 'flex-end'
              }}>
                <img 
                  src="/stamp2.png" 
                  alt="Official Stamp"
                  style={{
                    height: '90px',
                    width: 'auto',
                    maxWidth: '120px'
                  }}
                />
              </div>
              <p style={{ fontSize: '14px' }}>Official Stamp</p>
            </div>
          </div>

          {/* Verification and Address */}
          <div style={{ 
            marginTop: '10px',
            textAlign: 'center',
            fontSize: '13px',
            borderTop: '1px solid #d4a76a',
            paddingTop: '6px',
            paddingBottom: '40px'
          }}>
            <p><strong>Verify at:</strong> https://balajitraining.in/verify-certificate/</p>
            <p style={{ marginTop: '4px' }}><strong>Regd. Office:</strong>523, MANSAROVAR, Jaipur Rajasthan-302020</p>
            <p><strong>Mob:</strong> +91 9352793163 <strong>URL:</strong> www.balajitraining.in</p>
            <p><strong>Email:</strong> incharge.balajitraining@gmail.com</p>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <div className="flex justify-center mt-4">
        <button
          onClick={generateCertificate}
          disabled={isGenerating}
          className="flex cursor-pointer items-center px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium disabled:opacity-50"
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
    </div>
  );
};

export default CertificateTemplate;