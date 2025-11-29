import "../assets/footer.css";

function FooterElement({ text }: { text: string }) {
    return <div className="footer-text" dangerouslySetInnerHTML={{ __html: text }} />;
}

export default FooterElement;