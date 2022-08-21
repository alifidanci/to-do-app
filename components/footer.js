import Link from 'next/link'

export default function Footer() {
    return (
        <div className="footer">
            <div className="gitRepo">
                <Link href="/">
                    <a><span>git</span>reposity</a>
                </Link>
            </div>
            <div className="copyright">&copy; 2022 Ali Mustafa Fidancı</div>
            <style jsx>{`
                    .footer {
                        width: 100%;
                        height: 40px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        text-align: center;
                        background-color: #dee2e6;
                        padding: 0 20px;
                        font-size: 12px;
                    }
                    .footer .gitRepo span {
                        background: #b8c2cb;
                        padding: 3px;
                        border-radius: 3px;
                        margin-right: 5px;
                    }
                        
                    h4 {
                        font-size: 32px;
                    }
                `}</style>
        </div>
    )
}