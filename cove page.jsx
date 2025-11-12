import React, { useState, useRef, useEffect } from 'react';
import { Printer, Download, RefreshCw, Upload, Type } from 'lucide-react';

const App = () => {
  const [formData, setFormData] = useState({
    universityName: "Shahjalal University of Science and Technology (SUST)",
    address: "Sylhet – 3114, Bangladesh",
    department: "DEPARTMENT OF MATHEMATICS",
    name: "",
    regNo: "",
    courseTitle: "",
    courseInstructor: "",
    assignmentTitle: "",
    submissionDate: new Date().toISOString().split('T')[0],
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/c/c6/SUST_Logo.svg" 
  });

  // State for responsive scaling of the A4 preview
  const [scale, setScale] = useState(1);
  const previewContainerRef = useRef(null);
  const fileInputRef = useRef(null);

  // Calculate scale factor to fit A4 (approx 794px width) into the current screen
  useEffect(() => {
    const calculateScale = () => {
      if (previewContainerRef.current) {
        const containerWidth = previewContainerRef.current.offsetWidth;
        // 210mm is approx 794px at 96dpi. We add some padding (32px) logic.
        const a4WidthPx = 794; 
        // If screen is smaller than A4, scale down. Max scale is 1.
        const newScale = Math.min((containerWidth - 32) / a4WidthPx, 1);
        setScale(Math.max(newScale, 0.3)); // Don't let it get too tiny
      }
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          logoUrl: event.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row font-sans text-slate-800">
      
      {/* Left Panel: Editor (Scrollable on mobile) */}
      <div className="w-full md:w-1/3 bg-white border-b md:border-r border-slate-200 p-6 overflow-y-auto h-auto md:h-screen no-print shadow-lg z-10 order-2 md:order-1">
        <div className="flex items-center gap-2 mb-6 text-emerald-700">
          <Type size={24} />
          <h1 className="text-xl font-bold">Cover Page Builder</h1>
        </div>

        <div className="space-y-6 pb-24 md:pb-0">
          {/* Logo Section */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-600">University Logo</label>
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 border border-slate-200 rounded flex items-center justify-center bg-slate-50 overflow-hidden">
                {formData.logoUrl ? (
                  <img src={formData.logoUrl} alt="Logo" className="w-full h-full object-contain" />
                ) : (
                  <span className="text-xs text-slate-400">No Logo</span>
                )}
              </div>
              <button 
                onClick={() => fileInputRef.current.click()}
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-sm flex items-center gap-2 transition-colors"
              >
                <Upload size={16} /> Upload New
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleLogoUpload} 
                className="hidden" 
                accept="image/*"
              />
            </div>
          </div>

          {/* Header Info */}
          <div className="space-y-4 border-b border-slate-100 pb-6">
            <h3 className="font-semibold text-slate-900 text-sm uppercase tracking-wider">Header Information</h3>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">University Name</label>
              <input
                type="text"
                name="universityName"
                value={formData.universityName}
                onChange={handleInputChange}
                className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm font-bold"
              />
            </div>
          </div>

          {/* Student Info */}
          <div className="space-y-4 border-b border-slate-100 pb-6">
            <h3 className="font-semibold text-slate-900 text-sm uppercase tracking-wider">Student Details</h3>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Name</label>
              <input
                type="text"
                name="name"
                placeholder="e.g. Md. Rahim Uddin"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Registration No.</label>
              <input
                type="text"
                name="regNo"
                placeholder="e.g. 2020331000"
                value={formData.regNo}
                onChange={handleInputChange}
                className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Course Title</label>
              <input
                type="text"
                name="courseTitle"
                placeholder="e.g. Linear Algebra"
                value={formData.courseTitle}
                onChange={handleInputChange}
                className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Course Instructor</label>
              <input
                type="text"
                name="courseInstructor"
                placeholder="e.g. Dr. Anisur Rahman"
                value={formData.courseInstructor}
                onChange={handleInputChange}
                className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm"
              />
            </div>
          </div>

          {/* Assignment Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-900 text-sm uppercase tracking-wider">Assignment Details</h3>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Assignment Title</label>
              <textarea
                name="assignmentTitle"
                placeholder="e.g. Solution of linear equations using Matrix method"
                value={formData.assignmentTitle}
                onChange={handleInputChange}
                rows="3"
                className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm resize-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Date of Submission</label>
              <input
                type="date"
                name="submissionDate"
                value={formData.submissionDate}
                onChange={handleInputChange}
                className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel: Live Preview */}
      <div ref={previewContainerRef} className="flex-1 bg-slate-200 p-4 md:p-8 flex flex-col items-center justify-start overflow-hidden relative order-1 md:order-2 min-h-[400px]">
        
        {/* Floating Action Buttons */}
        <div className="fixed bottom-6 right-6 flex gap-2 no-print z-50 flex-col md:flex-row items-end">
           <button 
            onClick={() => setFormData({
                universityName: "Shahjalal University of Science and Technology (SUST)",
                address: "Sylhet – 3114, Bangladesh",
                department: "DEPARTMENT OF MATHEMATICS",
                name: "",
                regNo: "",
                courseTitle: "",
                courseInstructor: "",
                assignmentTitle: "",
                submissionDate: new Date().toISOString().split('T')[0],
                logoUrl: "https://upload.wikimedia.org/wikipedia/en/c/c6/SUST_Logo.svg"
            })}
            className="bg-white text-slate-600 p-3 rounded-full shadow-lg hover:bg-slate-50 transition-all border border-slate-200 group"
            title="Reset Form"
          >
            <RefreshCw size={20} className="group-hover:rotate-180 transition-transform duration-500" />
          </button>
          <button 
            onClick={handlePrint}
            className="bg-emerald-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-emerald-700 transition-all flex items-center gap-2 font-semibold"
          >
            <Printer size={20} />
            <span>Print / Save PDF</span>
          </button>
        </div>

        <div className="text-slate-500 text-sm mb-2 md:hidden flex items-center gap-1">
            <Upload size={12} />
            Preview (Scaled to fit screen)
        </div>

        {/* The A4 Page Scalable Wrapper */}
        <div 
            className="origin-top shadow-2xl bg-white transition-transform duration-300"
            style={{ 
                transform: `scale(${scale})`,
                marginBottom: `-${(1 - scale) * 1123}px` // Compensate for whitespace caused by scaling
            }}
        >
            <style dangerouslySetInnerHTML={{__html: `
                @import url('https://fonts.googleapis.com/css2?family=Times+New+Roman:wght@400;700&display=swap');
                
                .times-font {
                    font-family: 'Times New Roman', Times, serif;
                }

                /* A4 Dimensions fixed */
                .print-container {
                    width: 210mm; /* 794px */
                    height: 297mm; /* 1123px */
                    padding: 20mm;
                    box-sizing: border-box;
                    background: white;
                }

                /* Print Styles - Reset Scaling */
                @media print {
                    @page {
                        size: A4;
                        margin: 0;
                    }
                    body * {
                        visibility: hidden;
                    }
                    .print-container, .print-container * {
                        visibility: visible;
                    }
                    .print-container {
                        position: absolute;
                        left: 0;
                        top: 0;
                        margin: 0;
                        padding: 20mm;
                        width: 100% !important;
                        height: 100% !important;
                        transform: none !important;
                        box-shadow: none;
                    }
                    .no-print {
                        display: none !important;
                    }
                    /* Ensure background images/colors print */
                    * {
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                }
            `}} />

            <div className="print-container">
                <div className="flex flex-col items-center times-font text-black h-full">
                    
                    {/* Logo */}
                    <div className="w-32 h-32 mb-4">
                        {formData.logoUrl && (
                            <img src={formData.logoUrl} alt="University Logo" className="w-full h-full object-contain" />
                        )}
                    </div>

                    {/* Header Text */}
                    <div className="text-center space-y-2 mb-16">
                        <h1 className="text-xl font-bold leading-tight tracking-wide">
                            {formData.universityName}
                        </h1>
                        <p className="text-lg">
                            {formData.address}
                        </p>
                        <div className="pt-6">
                            <h2 className="text-2xl font-bold uppercase border-b-2 border-black inline-block pb-1">
                                {formData.department}
                            </h2>
                        </div>
                    </div>

                    {/* Student Info Table */}
                    <div className="w-full max-w-2xl space-y-2 mb-20 text-lg">
                        <InfoRow label="Name" value={formData.name} />
                        <InfoRow label="Registration No." value={formData.regNo} />
                        <InfoRow label="Course Title" value={formData.courseTitle} />
                        <InfoRow label="Course Instructor" value={formData.courseInstructor} />
                    </div>

                    {/* Assignment Title */}
                    <div className="w-full max-w-2xl mb-20 text-lg">
                        <div className="grid grid-cols-[180px_20px_1fr]">
                            <div className="font-medium">Assignment Title</div>
                            <div className="font-medium">:</div>
                            <div className="break-words leading-relaxed whitespace-pre-wrap">{formData.assignmentTitle}</div>
                        </div>
                    </div>

                    {/* Submission Date */}
                    <div className="w-full max-w-2xl mt-auto text-lg">
                        <InfoRow label="Date of Submission" value={formData.submissionDate} />
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

// Helper component
const InfoRow = ({ label, value }) => (
    <div className="grid grid-cols-[180px_20px_1fr] items-baseline">
        <div className="font-medium whitespace-nowrap py-1">{label}</div>
        <div className="font-medium py-1">:</div>
        <div className="py-1 font-normal break-words">{value}</div>
    </div>
);

export default App;

