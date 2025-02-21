export type StudentResult = {
  usn: string
  name: string
  semester: string
  parentName: string
  photoUrl: string
  courses: {
    sNo: number
    courseCode: string
    courseName: string
    credits: number
    grade: string
    gpa: number
  }[]
  totalCredits: number
  sgpa: number
  cgpa: number
  examYear: string
  date: string
}

