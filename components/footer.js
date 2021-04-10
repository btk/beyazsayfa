import Link from 'next/link'

export default function Footer() {
  return (
    <>
      <div style={{height: 180}}></div>
      <div className="footer">
        <div style={{display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 10}}>
          <Link href={"/"} style={{width: 120}}>
            <a><img src={require('./logo.svg')} style={{width: 120}}/></a>
          </Link>
          <p style={{margin: 0, marginLeft: 20, borderLeft: "1px solid #666", paddingLeft: 20, opacity: 0.6}}>
            © {new Date().getFullYear()}, {` `} <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">Creative Commons 4.0</a>
          </p>
        </div>
        <div>
          <p>Site içeriği kripto paralarının genelgeçer teknolojik altyapı ve gelişmelerinden oluşmaktadır, yatırım kararlarında yönerge olarak kullanılmamalıdır.</p>
        </div>
        <div style={{opacity: 0.8}}>
          <Link href={"/"}>
            <a style={{paddingRight: 10}}>Anasayfa</a>
          </Link>
          <Link href={"/hakkinda"}>
            <a style={{paddingRight: 10}}>Hakkında</a>
          </Link>
          <Link href={"/kripto-paralar"}>
            <a style={{paddingRight: 10}}>Kripto Paralar</a>
          </Link>
        </div>
      </div>
    </>
  )
}
