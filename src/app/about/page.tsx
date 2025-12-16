import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Heart, Target, Users, BookOpen, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="w-32 h-32 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-8">
            <GraduationCap className="w-16 h-16 text-primary" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold">About This Project</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            A passion project demonstrating my commitment to economics education and my aspiration 
            to become an inspiring educator who makes a meaningful difference in students' lives.
          </p>
        </div>
      </section>

      {/* My Story */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Heart className="w-6 h-6 text-primary" />
                My Teaching Journey & Passion
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                My passion for economics education stems from my own transformative learning experience. 
                I remember struggling with abstract economic concepts until a dedicated teacher took the time 
                to explain them through real-world examples and patient guidance. That moment sparked my love 
                for the subject and inspired me to help others experience the same clarity and excitement.
              </p>
              <p>
                Throughout my academic journey, I've consistently sought opportunities to share my knowledge 
                with peers through informal tutoring and study groups. Witnessing the "lightbulb moment" when 
                a concept finally clicks for a student is incredibly rewarding and reinforces my desire to 
                pursue teaching as a career.
              </p>
              <p>
                I believe economics is more than just graphs and theories - it's a lens through which we 
                understand the world around us. From daily decisions about spending to major policy debates 
                affecting millions, economic thinking empowers students to be informed, critical citizens. 
                This is the perspective I want to bring to my future students.
              </p>
            </CardContent>
          </Card>

          {/* Why This Project */}
          <Card className="border-2">
            <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <Target className="w-6 h-6 text-primary" />
                  Why I Built EconStack
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I created EconHub to address a gap I observed: while there are many economics resources 
                available, few provide a comprehensive, well-organized collection specifically tailored to 
                the Singapore syllabus for both secondary and JC levels. Students often struggle to find 
                quality materials that progressively build understanding.
              </p>
              <p>
                This project represents hundreds of hours of work - researching syllabus requirements, 
                crafting clear explanations, developing model answers, and organizing content in an 
                accessible way. Each note, essay, and question has been carefully designed to help students 
                not just memorize, but truly understand economic concepts.
              </p>
              <p>
                Beyond demonstrating my subject knowledge, this platform showcases my commitment to 
                accessibility and student-centered learning. I've organized resources by difficulty, 
                provided multiple pathways to explore content, and included detailed explanations that 
                anticipate common misconceptions.
              </p>
            </CardContent>
          </Card>

          {/* Skills & Qualities */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Subject Expertise
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <Badge variant="secondary">Microeconomics</Badge>
                  <p className="text-sm text-muted-foreground">
                    Deep understanding of market mechanisms, elasticity, and market failures
                  </p>
                </div>
                <div className="space-y-2">
                  <Badge variant="secondary">Macroeconomics</Badge>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive knowledge of national income, policies, and international trade
                  </p>
                </div>
                <div className="space-y-2">
                  <Badge variant="secondary">Exam Techniques</Badge>
                  <p className="text-sm text-muted-foreground">
                    Understanding of assessment requirements and how to help students excel
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-3">
                  <Users className="w-5 h-5 text-primary" />
                  Teaching Qualities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <Badge variant="secondary">Patient & Empathetic</Badge>
                  <p className="text-sm text-muted-foreground">
                    Understanding that every student learns at their own pace
                  </p>
                </div>
                <div className="space-y-2">
                  <Badge variant="secondary">Clear Communicator</Badge>
                  <p className="text-sm text-muted-foreground">
                    Ability to break down complex concepts into understandable parts
                  </p>
                </div>
                <div className="space-y-2">
                  <Badge variant="secondary">Innovative</Badge>
                  <p className="text-sm text-muted-foreground">
                    Creating resources and using technology to enhance learning
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Vision */}
          <Card className="border-2 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Award className="w-6 h-6 text-primary" />
                My Vision as an Economics Educator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                As a future economics teacher in Singapore's education system, I envision creating a 
                classroom environment where students feel empowered to ask questions, challenge assumptions, 
                and apply economic thinking to real-world issues. I want to be the teacher who makes economics 
                come alive - not through dry textbook definitions, but through engaging discussions, 
                current events, and relatable examples.
              </p>
              <p>
                I'm committed to continuous professional development and staying updated with pedagogical 
                best practices. This project itself demonstrates my willingness to go beyond traditional 
                methods and leverage technology to support student learning both inside and outside the classroom.
              </p>
              <p>
                Most importantly, I want to inspire in my students the same passion for economics that was 
                inspired in me. I believe that great teachers don't just teach content - they ignite curiosity, 
                build confidence, and prepare students to be lifelong learners and contributors to society.
              </p>
            </CardContent>
          </Card>

          {/* Message to MOE */}
          <Card className="border-2 border-primary">
            <CardHeader>
              <CardTitle className="text-2xl">A Message to the Ministry of Education</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                This platform represents more than just a collection of resources - it's a testament to my 
                dedication to Singapore's education system and my commitment to making a meaningful contribution 
                as an economics educator.
              </p>
              <p>
                I understand that being a teacher is both a privilege and a responsibility. It requires not 
                just subject knowledge, but empathy, patience, creativity, and an unwavering commitment to 
                student success. Through this project, I hope to demonstrate that I possess these qualities 
                and am ready to dedicate myself to nurturing the next generation of economically literate citizens.
              </p>
              <p className="font-medium text-foreground">
                I am eager to bring my passion, skills, and innovative approach to Singapore's classrooms, 
                and I look forward to the opportunity to contribute to our nation's excellent education system.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Project Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary">200+</div>
              <div className="text-sm text-muted-foreground">Hours of Development</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Study Notes Created</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary">30+</div>
              <div className="text-sm text-muted-foreground">Model Essays Written</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary">100+</div>
              <div className="text-sm text-muted-foreground">Practice Questions</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Heart, Target, Users, BookOpen, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="w-32 h-32 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-8">
            <GraduationCap className="w-16 h-16 text-primary" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold">About This Project</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            A passion project demonstrating my commitment to economics education and my aspiration 
            to become an inspiring educator who makes a meaningful difference in students' lives.
          </p>
        </div>
      </section>

      {/* My Story */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Heart className="w-6 h-6 text-primary" />
                My Teaching Journey & Passion
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                My passion for economics education stems from my own transformative learning experience. 
                I remember struggling with abstract economic concepts until a dedicated teacher took the time 
                to explain them through real-world examples and patient guidance. That moment sparked my love 
                for the subject and inspired me to help others experience the same clarity and excitement.
              </p>
              <p>
                Throughout my academic journey, I've consistently sought opportunities to share my knowledge 
                with peers through informal tutoring and study groups. Witnessing the "lightbulb moment" when 
                a concept finally clicks for a student is incredibly rewarding and reinforces my desire to 
                pursue teaching as a career.
              </p>
              <p>
                I believe economics is more than just graphs and theories - it's a lens through which we 
                understand the world around us. From daily decisions about spending to major policy debates 
                affecting millions, economic thinking empowers students to be informed, critical citizens. 
                This is the perspective I want to bring to my future students.
              </p>
            </CardContent>
          </Card>

          {/* Why This Project */}
          <Card className="border-2">
            <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <Target className="w-6 h-6 text-primary" />
                  Why I Built EconStack
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I created EconStack to address a gap I observed: while there are many economics resources 
                available, few provide a comprehensive, well-organized collection specifically tailored to 
                the Singapore syllabus for both secondary and JC levels. Students often struggle to find 
                quality materials that progressively build understanding.
              </p>
              <p>
                This project represents hundreds of hours of work - researching syllabus requirements, 
                crafting clear explanations, developing model answers, and organizing content in an 
                accessible way. Each note, essay, and question has been carefully designed to help students 
                not just memorize, but truly understand economic concepts.
              </p>
              <p>
                Beyond demonstrating my subject knowledge, this platform showcases my commitment to 
                accessibility and student-centered learning. I've organized resources by difficulty, 
                provided multiple pathways to explore content, and included detailed explanations that 
                anticipate common misconceptions.
              </p>
            </CardContent>
          </Card>

          {/* Skills & Qualities */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Subject Expertise
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <Badge variant="secondary">Microeconomics</Badge>
                  <p className="text-sm text-muted-foreground">
                    Deep understanding of market mechanisms, elasticity, and market failures
                  </p>
                </div>
                <div className="space-y-2">
                  <Badge variant="secondary">Macroeconomics</Badge>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive knowledge of national income, policies, and international trade
                  </p>
                </div>
                <div className="space-y-2">
                  <Badge variant="secondary">Exam Techniques</Badge>
                  <p className="text-sm text-muted-foreground">
                    Understanding of assessment requirements and how to help students excel
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-3">
                  <Users className="w-5 h-5 text-primary" />
                  Teaching Qualities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <Badge variant="secondary">Patient & Empathetic</Badge>
                  <p className="text-sm text-muted-foreground">
                    Understanding that every student learns at their own pace
                  </p>
                </div>
                <div className="space-y-2">
                  <Badge variant="secondary">Clear Communicator</Badge>
                  <p className="text-sm text-muted-foreground">
                    Ability to break down complex concepts into understandable parts
                  </p>
                </div>
                <div className="space-y-2">
                  <Badge variant="secondary">Innovative</Badge>
                  <p className="text-sm text-muted-foreground">
                    Creating resources and using technology to enhance learning
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Vision */}
          <Card className="border-2 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Award className="w-6 h-6 text-primary" />
                My Vision as an Economics Educator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                As a future economics teacher in Singapore's education system, I envision creating a 
                classroom environment where students feel empowered to ask questions, challenge assumptions, 
                and apply economic thinking to real-world issues. I want to be the teacher who makes economics 
                come alive - not through dry textbook definitions, but through engaging discussions, 
                current events, and relatable examples.
              </p>
              <p>
                I'm committed to continuous professional development and staying updated with pedagogical 
                best practices. This project itself demonstrates my willingness to go beyond traditional 
                methods and leverage technology to support student learning both inside and outside the classroom.
              </p>
              <p>
                Most importantly, I want to inspire in my students the same passion for economics that was 
                inspired in me. I believe that great teachers don't just teach content - they ignite curiosity, 
                build confidence, and prepare students to be lifelong learners and contributors to society.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

