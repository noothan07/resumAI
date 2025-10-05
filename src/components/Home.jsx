import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
    const [formData, setFormData] = useState({
    companyName: "",
    applyingAsA:"Fresher",
    coverLetterTone: "Formal",
    jobDescription: "",
    currentResume: "",
  });

  const [geminiResponse, setgeminiResponse] = useState("");
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  // Function to parse and display the structured response
    const parseAndDisplayResponse = (response) => {
        if (!response) return null;

        // Split the response into sections
        const sections = response.split(/(?=\d+\.\s\*\*)|(?=##\s)|(?=\*\*\d+\.)/);
        
        return (
            <div className="response-sections">
                {sections.map((section, index) => {
                    if (!section.trim()) return null;
                    
                    // Check if it's a main section (numbered)
                    const isMainSection = /^\d+\.\s\*\*/.test(section.trim()) || /^\*\*\d+\./.test(section.trim());
                    
                    if (isMainSection) {
                        // Extract title and content
                        const lines = section.trim().split('\n');
                        const titleLine = lines[0];
                        const content = lines.slice(1).join('\n').trim();
                        
                        // Extract clean title
                        const title = titleLine.replace(/^\d+\.\s\*\*/, '').replace(/\*\*$/, '').replace(/^\*\*\d+\./, '').trim();
                        
                        return (
                            <div key={index} className="response-section">
                                <h3 className="section-title">{title}</h3>
                                <div className="section-content">
                                    {formatContent(content)}
                                </div>
                            </div>
                        );
                    } else {
                        // Handle any remaining content
                        return (
                            <div key={index} className="response-section">
                                <div className="section-content">
                                    {formatContent(section.trim())}
                                </div>
                            </div>
                        );
                    }
                })}
            </div>
        );
    };

    // Function to format content within sections
    const formatContent = (content) => {
        if (!content) return null;
        
        return content.split('\n').map((line, index) => {
            const trimmedLine = line.trim();
            if (!trimmedLine) return <br key={index} />;
            
            // Handle bullet points
            if (trimmedLine.startsWith('- ')) {
                return (
                    <div key={index} className="bullet-point">
                        • {trimmedLine.substring(2)}
                    </div>
                );
            }
            
            // Handle bold text
            if (trimmedLine.includes('**')) {
                const parts = trimmedLine.split('**');
                return (
                    <p key={index}>
                        {parts.map((part, partIndex) => 
                            partIndex % 2 === 1 ? <strong key={partIndex}>{part}</strong> : part
                        )}
                    </p>
                );
            }
            
            // Handle sub-headers or emphasized lines
            if (trimmedLine.endsWith(':')) {
                return <h4 key={index} className="sub-header">{trimmedLine}</h4>;
            }
            
            // Regular paragraph
            return <p key={index}>{trimmedLine}</p>;
        });
    };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    setgeminiResponse('Generating response, please wait...');
    const prompt = `You are a professional career coach and resume optimization expert. 
                    Your task is to generate a personalized cover letter, improve the resume content, 
                    and provide an ATS (Applicant Tracking System) analysis.

                    Inputs:
                    Company Name: ${formData.companyName}
                    Experience Level: ${formData.applyingAsA}  (Fresher / Experienced)
                    Job Description: ${formData.jobDescription}
                    Current Resume: ${formData.currentResume} (If empty, assume no resume exists and create a draft)
                    Preferred Tone: ${formData.coverLetterTone}

                    Output (format clearly in sections):

                    1. Tailored Cover Letter  
                    Write a professional cover letter addressed to ${formData.companyName}.  
                    Use the specified tone: ${formData.coverLetterTone}.  
                    Highlight relevant skills and experiences based on the job description.  

                    2. Updated Resume Content  
                    Suggest optimized resume summary, bullet points, and skills tailored to ${formData.jobDescription}.  
                    Ensure the content is concise, achievement-focused, and ATS-friendly.  

                    3. Keyword Match Analysis  
                    Extract the most important keywords from the job description.  
                    Check if they exist in the provided resume (if given).  
                    List missing keywords that should be added.  

                    4. ATS Score Estimate (0–100)  
                    Provide a rough ATS match score for the current resume against the job description.  
                    Explain the reasoning briefly (e.g., missing keywords, formatting issues, irrelevant content).  

                    Ensure the response is structured, clear, and easy to display in a React app`;

      const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key" : "AIzaSyAbrjlCX0jItFxRvXCZ0wu4hbMmsFhS4m4"   //API KEY 
        },
        body: `{
          contents: [{parts: [{ text: "${prompt}" }]}]}`
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log("generated api data",data.candidates[0].content.parts[0].text);
        setgeminiResponse(data.candidates[0].content.parts[0].text);
      } catch (error) {
        console.error("Error:", error);
      }
  };

 //

  return (
    <section className="response" id="Home">
      <motion.form onSubmit={handleSubmit}  className="bg-white p-4 md:p-8 rounded-3xl shadow-md w-full space-y-6 mt-5"
      initial={{y:200,opacity:0}} whileInView={{y:0,opacity:1}} transition={{duration:0.5,ease:"easeOut"}} >
        {/* Input Field */}
        <div className="grid lg:grid-cols-2 gap-8">
            <div>
            <label className="label" htmlFor="companyName"><i className="fa-solid fa-building"></i> Company Name </label>
            <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Enter your name"
            className="form" required/>
            <div className=" label2">company you are applying to</div>
            </div>

            {/* Dropdown 1 */}
            <div>
            <label className="label" htmlFor="applyingAsA">
              <i className="fa-solid fa-id-badge"></i> Experience level
            </label>
            <select
                name="applyingAsA"
                value={formData.applyingAsA}
                onChange={handleChange}
                required
                className="form">
                <option value="Fresher">Fresher</option>
                <option value="Experienced">Experienced</option>
            </select>
            <div className=" label2">are you applying as a fresher or experienced</div>
            </div>
        </div>

        {/* Dropdown 2 */}
        <div>
          <label className="label" htmlFor="coverLetterTone">
           <i className="fa-solid fa-envelope-open-text"></i> Cover letter tone
          </label>
          <select
            required
            name="coverLetterTone"
            value={formData.coverLetterTone}
            onChange={handleChange}
            className="form"
          >
            <option value="Formal">Formal</option>
            <option value="Informal">Informal</option>
            <option value="Casual">Casual</option>
          </select>
          <div className=" label2">select the tone of your cover letter</div>
        </div>

        {/* Textarea 1 */}
        <div>
          <label className="label" htmlFor="jobDescription">
            <i className="fa-solid fa-file-lines"></i> Job description
          </label>
          <textarea
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleChange}
            rows="5"
            placeholder="Enter text here"
            className="form"
            required
          ></textarea>
          <div className=" label2">paste the complete job description for better matching</div>
        </div>

        {/* Textarea 2 */}
        <div>
          <label className="label" htmlFor="currentResume">
          <i className="fa-solid fa-square-poll-horizontal"></i> Current resume (optional)
          </label>
          <textarea
            name="currentResume"
            value={formData.currentResume}
            onChange={handleChange}
            rows="5"
            placeholder="Enter more text"
            className="form"
            required
          ></textarea>
          <div className="label2">Paste your current resume to get optimization and suggestions</div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-4 sm:py-7 rounded-2xl hover:bg-blue-600 transition-colors font-bold text-[15px] sm:text-xl"
        >
          <i className="fa-duotone fa-solid fa-wand-magic-sparkles"></i> Generate AI-Powered Resume & Cover Letter
        </button>
      </motion.form>
      {/* Response Section */}
        <div className="response-container">
          {geminiResponse && (
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
              {/* Header */}
              <div className="bg-green-600 text-white py-4 px-6 flex items-center justify-center">
                <i className="bi bi-check-circle text-xl mr-2"></i>
                <h3 className="text-xl font-semibold m-0">AI Generated Results</h3>
              </div>

              {/* Body */}
              <div className="p-2 sm:p-10">
                <div className="gemini-response text-gray-800 leading-relaxed space-y-4">
                  {parseAndDisplayResponse(geminiResponse)}
                </div>
              </div>
            </div>
          )}
        </div>

    </section>
  )
}


