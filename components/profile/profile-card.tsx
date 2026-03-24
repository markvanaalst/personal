import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TextLoop } from "@/components/ui/text-loop";
import Image from "next/image";
import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";
import { typedResumeData } from "@/lib/types"

export function ProfileCard() {
    return (
        <Card className="hidden lg:flex w-1/4 sticky h-full top-16 px-4 py-6">
            <CardContent className="flex flex-col gap-4 p-0">
                <div className="text-center w-full">
                    <Image src="/mva_profile.webp" alt="Profile Picture" width={200} height={200} className="rounded-full mx-auto mb-4" />
                    <h1 className="text-xl font-semibold">{typedResumeData.firstName} {typedResumeData.lastName}</h1>
                </div>

                <div className="flex items-center justify-center gap-4 w-full">
                <Button variant="outline" size="icon" className="rounded-full">
                    <IconBrandGithub />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                    <IconBrandLinkedin />
                </Button>
                </div>

                <div className='inline-flex w-full py-4 whitespace-pre-wrap text-sm border-t'>
                    Experienced in{' '}
                    <TextLoop
                        className='overflow-y-clip'
                        transition={{
                            type: 'spring',
                            stiffness: 900,
                            damping: 80,
                            mass: 10,
                        }}
                        variants={{
                            initial: {
                                y: 20,
                                rotateX: 90,
                                opacity: 0,
                                filter: 'blur(4px)',
                            },
                            animate: {
                                y: 0,
                                rotateX: 0,
                                opacity: 1,
                                filter: 'blur(0px)',
                            },
                            exit: {
                                y: -20,
                                rotateX: -90,
                                opacity: 0,
                                filter: 'blur(4px)',
                            },
                        }}
                    >
                        <span>Full Stack development</span>
                        <span>Backend Development</span>
                        <span>Architecture</span>
                        <span>AI Frameworks</span>
                    </TextLoop>
                </div>
            </CardContent>
        </Card>
    );
}
