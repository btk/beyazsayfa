import Link from 'next/link'

export default function Header() {
  return (
    <>
      <div className="header">
        <div className="logo">
          <Link href={"/"} style={{width: 180}}>
            <a><img src={require('./logo.svg')} style={{width: 180, marginLeft: 7}}/></a>
          </Link>
        </div>
      </div>
    </>
  )
}
