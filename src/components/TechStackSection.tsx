
import { IconCloud } from "@/components/ui/interactive-icon-cloud"

const TechStackSection = () => {
  // Enhanced icon list for better visual impact
  const techStackIcons = [
    "typescript",
    "javascript",
    "react",
    "nextdotjs",
    "nodejs",
    "postgresql",
    "tailwindcss",
    "html5",
    "css3",
    "python",
    "amazonaws",
    "docker",
    "git",
    "github",
    "vercel",
    "firebase",
    "supabase",
    "figma",
    "openai",
    "express",
    "prisma",
    "nginx"
  ]

  return (
    <section id="tech-stack" className="py-16 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Copy */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
                Built with <span className="gradient-text">Modern Tech Stack</span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                We leverage cutting-edge technologies to deliver robust, scalable, and high-performance applications that stand the test of time.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <h3 className="font-semibold text-foreground">Frontend Excellence</h3>
                  <p className="text-muted-foreground">React, Next.js, TypeScript, and Tailwind CSS for modern, responsive interfaces</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <h3 className="font-semibold text-foreground">Backend Power</h3>
                  <p className="text-muted-foreground">Node.js, Python, and cloud-native solutions for scalable server architecture</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <h3 className="font-semibold text-foreground">AI Integration</h3>
                  <p className="text-muted-foreground">OpenAI, machine learning frameworks, and intelligent automation tools</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <h3 className="font-semibold text-foreground">Cloud & DevOps</h3>
                  <p className="text-muted-foreground">AWS, Docker, Kubernetes for reliable deployment and scaling</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Interactive Icon Cloud */}
          <div className="flex justify-center">
            <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-lg border bg-background/50 backdrop-blur-sm px-20 pb-20 pt-8">
              <IconCloud iconSlugs={techStackIcons} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TechStackSection
