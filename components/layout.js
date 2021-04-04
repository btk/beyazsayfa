import Header from "./header"
import Footer from "./footer"
import styles from '@/styles/Layout.module.css'

const Layout = ({ children }) => {
  return (
    <div className={styles.carrier}>
      <Header/>
      <div
        style={{
          margin: `20px auto`,
          maxWidth: 1000,
          padding: `20px`,
          paddingTop: 0,
          marginBottom: 0
        }}
      >
        <div className={styles.main}>{children}</div>
        <Footer/>
      </div>
    </div>
  )
}

export default Layout
