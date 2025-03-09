export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="w-full text-black bg-[--foreground] py-8">
            <div className="max-w-8xl mx-auto px-10">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="font-poppins text-lg mb-4 md:mb-0 hover:text">
                        {currentYear} Yolk Workshop
                    </div>
                    <div className="flex space-x-12 ">
                        <a
                            href="/terms"
                            className="font-poppins text-lg hover:text-[--accent] transition-colors duration-100"
                        >
                            TERMS
                        </a>
                        <a
                            href="https://github.com/Yolk-Workshop"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-poppins text-lg hover:text-[--accent] transition-colors duration-100"
                        >
                            GITHUB
                        </a>
                        <a
                            href="https://instagram.com/yolkworkshop"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-poppins text-lg  hover:text-[--accent] transition-colors duration-100"
                        >
                            INSTAGRAM
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}