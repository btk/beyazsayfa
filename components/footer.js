import Link from 'next/link'

export default function Footer() {
  return (
    <>
      <div style={{height: 180}}></div>
      <div className="footer">

        <Link href={"/"} style={{width: 120}}>
          <a><img src={require('./logo.svg')} style={{width: 120}}/></a>
        </Link>
        <div>
          <p>© {new Date().getFullYear()}, {` `} Beyaz Sayfa</p>
        </div>
      </div>
    </>
  )
}
