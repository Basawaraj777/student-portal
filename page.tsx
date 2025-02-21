"use client";

import type React from "react";

import { useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { sampleData } from "./data";
import type { StudentResult } from "./types";
import html2pdf from "html2pdf.js";

export default function ResultsPage() {
  const [studentName, setStudentName] = useState("");
  const [usn, setUsn] = useState("");
  const [error, setError] = useState("");
  const contentRef = useRef(null);
  const [result, setResult] = useState<StudentResult | null>(null);

  const convertToPdf = () => {
    const content = contentRef.current;

    const options = {
      filename: "my-document.pdf",
      margin: 1,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 1 },
      jsPDF: {
        unit: "in",
        format: "letter",
        orientation: "portrait",
      },
    };

    html2pdf()
      .set(options)
      .from(content)
      .save({ pagebreak: { mode: ["avoid-all", "css", "legacy"] } });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResult(null);

    // Check if student exists in sample data
    const studentResult = sampleData[usn];
    if (
      studentResult &&
      studentResult.name.toLowerCase() === studentName.toLowerCase()
    ) {
      setResult(studentResult);
    } else {
      setError("Invalid credentials or no results found");
    }
  };

  if (result) {
    return (
      <div ref={contentRef} className="min-h-screen bg-white p-8">
        <div>
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-02-21%20at%2021.16.21_4f58075c.jpg-80NFhguxzDO87nBOOpiI75Yrds0aXC.jpeg"
                  alt="New Horizon College of Engineering"
                  width={100}
                  height={100}
                  className="h-16 w-auto"
                />
                <div>
                  <h1 className="text-xl font-semibold">
                    New Horizon College of Engineering,
                  </h1>
                  <p className="text-sm text-gray-600">
                    (AUTONOMOUS INSTITUTE AFFILIATED TO VTU) BANGALORE - 560 054
                  </p>
                </div>
              </div>
              <Image
                src={result.photoUrl || "/placeholder.svg"}
                alt="Student Photo"
                width={100}
                height={120}
                className="border"
              />
            </div>

            {/* Title */}
            <h2 className="text-center font-semibold">
              Provisional Grade Card Odd Semester End Examination A.Y:{" "}
              {result.examYear} Examination
            </h2>

            {/* Student Details */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p>
                  <span className="font-semibold">USN:</span> {result.usn}
                </p>
                <p>
                  <span className="font-semibold">NAME:</span> {result.name}
                </p>
              </div>
              <div>
                <p>
                  <span className="font-semibold">Semester:</span>{" "}
                  {result.semester}
                </p>
                <p>
                  <span className="font-semibold">Father's/Mother's Name:</span>{" "}
                  {result.parentName}
                </p>
              </div>
            </div>

            {/* Results Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border p-2 text-left">S. No</th>
                    <th className="border p-2 text-left">Course Code</th>
                    <th className="border p-2 text-left">Course Name</th>
                    <th className="border p-2 text-left">Credits</th>
                    <th className="border p-2 text-left">Grade</th>
                    <th className="border p-2 text-left">GPA</th>
                  </tr>
                </thead>
                <tbody>
                  {result.courses.map((course) => (
                    <tr key={course.sNo}>
                      <td className="border p-2">{course.sNo}</td>
                      <td className="border p-2">{course.courseCode}</td>
                      <td className="border p-2">{course.courseName}</td>
                      <td className="border p-2">
                        {course.credits.toFixed(2)}
                      </td>
                      <td className="border p-2">{course.grade}</td>
                      <td className="border p-2">{course.gpa.toFixed(2)}</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50">
                    <td
                      colSpan={3}
                      className="border p-2 text-right font-semibold"
                    >
                      Total
                    </td>
                    <td className="border p-2">{result.totalCredits}</td>
                    <td colSpan={2} className="border p-2"></td>
                  </tr>
                  <tr>
                    <td
                      colSpan={3}
                      className="border p-2 text-right font-semibold"
                    >
                      SGPA
                    </td>
                    <td colSpan={3} className="border p-2">
                      {result.sgpa.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan={3}
                      className="border p-2 text-right font-semibold"
                    >
                      CGPA
                    </td>
                    <td colSpan={3} className="border p-2">
                      {result.cgpa.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="text-sm text-gray-600">
              <p>Date: {result.date}</p>
              <p className="mt-2 text-xs italic">
                Note: The results published on this web site are provisional and
                are provided for immediate information to the examinees. These
                results may not be used as official confirmation of your
                achievement.
              </p>
            </div>

            {/* Back Button */}
            <Button
              onClick={() => {
                setResult(null);
                setStudentName("");
                setUsn("");
              }}
              className="mt-4"
            >
              Back to Search
            </Button>
            <div className="my-4  flex items-center justify-center">
              <Button
                className="py-4 px-4"
                variant="secondary"
                onClick={convertToPdf}
              >
                Print
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-02-21%20at%2021.16.21_4f58075c.jpg-80NFhguxzDO87nBOOpiI75Yrds0aXC.jpeg"
              alt="New Horizon College of Engineering"
              width={300}
              height={50}
              className="h-12 w-auto"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-sm">powered by</span>
            <span className="text-red-600 font-semibold">Contineo</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-xl font-semibold text-gray-800">
              Provisional Results
            </h1>
            <Button variant="outline" className="text-blue-600">
              CLICK HERE TO LOGIN
            </Button>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="text-center mb-6">
            <p className="text-red-500 text-sm">
              PLEASE NOTE THAT THE CGPA/SGPA DISPLAYED IS PROVISIONAL
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-blue-500 rounded-lg p-6 space-y-4"
          >
            <div className="space-y-2">
              <label className="block text-white">Student Name</label>
              <Input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Enter student name"
                className="w-full bg-white"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-white">
                Enter the university Seat No (USN)/ Roll No.
              </label>
              <Input
                type="text"
                value={usn}
                onChange={(e) => setUsn(e.target.value)}
                placeholder="Enter USN/Roll number"
                className="w-full bg-white"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white"
            >
              Submit
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
