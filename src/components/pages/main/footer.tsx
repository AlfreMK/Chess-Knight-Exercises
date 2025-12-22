export const Footer = () => {
  return (
    <footer className="text-center">
      Made by <Link href="https://github.com/AlfreMK"> Alfredo Medina</Link>.
      Inspired by <Link href="https://www.jairtrejo.com/"> Jair Trejo</Link> and
      <Link href="https://www.danheisman.com/chess-exercises.html">
        {' '}
        Dan Heisman{' '}
      </Link>
    </footer>
  )
}

const Link = ({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) => {
  return (
    <a href={href} className="font-bold hover:underline text-primary">
      {children}
    </a>
  )
}
