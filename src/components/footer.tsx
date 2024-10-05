export default function Footer() {
  return (
    <div className="my-10 flex">
      <p>Designed By</p>
      <a href="https://blog.sunguoqi.com" className="mx-1 hover:text-blue-500">
        Guoqi Sun
      </a>
      <p className="mx-1">|</p>
      <p> Powered By </p>
      <a
        href="https://github.com/sun0225SUN/astro-air"
        className="mx-1 hover:text-blue-500"
      >
        Astro Air
      </a>
    </div>
  )
}
