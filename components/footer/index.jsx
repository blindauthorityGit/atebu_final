import Link from "next/link";

const Footer = () => {
    return (
        <footer className=" text-blackText ">
            <div className="container mx-auto py-6 px-8">
                <div className="flex flex-wrap justify-between">
                    <div className="w-full sm:w-1/2 lg:w-1/4 mb-4">
                        <h4 className="mb-4 font-bold">Kontakt</h4>
                        <p>Atelier Buchner</p>
                        <p>Prof. Sepp Buchner-Straße 528</p>
                        <p>2823 Pitten</p>
                        <p>(+43) 650 / 944 54 10</p>
                        <p>office@atelierbuchner.at</p>
                    </div>
                    <div className="w-full sm:w-1/2 lg:w-1/4 mb-4">
                        <h4 className="mb-4 font-bold">Galerie Buchner</h4>
                        <p>Termine auf Anfrage</p>
                    </div>
                    <div className="w-full sm:w-1/2 lg:w-1/4 mb-4">
                        <h4 className="mb-4 font-bold">Links</h4>
                        <ul>
                            <li>
                                <Link href="/about">
                                    <a>About Us</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/services">
                                    <a>Our Services</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog">
                                    <a>Blog</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full sm:w-1/2 lg:w-1/4 mb-4">
                        <h4 className="mb-4 font-bold">Partners</h4>
                        <ul>
                            <li>Partner 1</li>
                            <li>Partner 2</li>
                            <li>Partner 3</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="bg-blackText text-primaryColor-300 px-4 py-2">
                <div className="container mx-auto text-center text-sm">
                    <p>© 2023 Atelier Buchner. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
