import { FC } from "react"
import Image from "next/image"

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TrailerPageViewContentProps {}

const cards = [
  {
    image:
      "https://ik.imagekit.io/brandamp/vf-822-superbad-making-of-005.webp?updatedAt=1697774588841",
    title: "Comedy",
  },
  {
    image:
      "https://ik.imagekit.io/brandamp/conjuring.jpeg?updatedAt=1697774588426",
    title: "Horror",
  },
  {
    image: "https://ik.imagekit.io/brandamp/drama.jpg?updatedAt=1697774588467",
    title: "Drama",
  },
  {
    image:
      "https://ik.imagekit.io/brandamp/adventure.jpeg?updatedAt=1697774588058",
    title: "Adventure",
  },
  {
    image:
      "https://ik.imagekit.io/brandamp/good%20bad%20and%20ugly.jpg?updatedAt=1697774588472",
    title: "Western",
  },
  {
    image:
      "https://ik.imagekit.io/brandamp/action2.webp?updatedAt=1697774588792",
    title: "Action",
  },
  {
    image:
      "https://ik.imagekit.io/brandamp/science.jpeg?updatedAt=1697774588151",
    title: "Science Fiction",
  },
  {
    image:
      "https://ik.imagekit.io/brandamp/scarface.jpg?updatedAt=1697774588470",
    title: "Crime",
  },
  {
    image:
      "https://ik.imagekit.io/brandamp/Donnie-Darko-Cast-Where-Are-They-Now.webp?updatedAt=1697774830457",
    title: "Indie",
  },
  {
    image:
      "https://ik.imagekit.io/brandamp/romance.jpg?updatedAt=1697775524310",
    title: "Romance",
  },
  {
    image: "https://ik.imagekit.io/brandamp/anim.jpeg?updatedAt=1697775524152",
    title: "Animation",
  },
  {
    image:
      "https://ik.imagekit.io/brandamp/fantasy.webp?updatedAt=1697775524401",
    title: "Fantasy",
  },
]

export const TrailerPageViewContent: FC<TrailerPageViewContentProps> = () => {
  return (
    <div className="flex flex-wrap justify-center gap-8 mt-8">
      {cards.map((card, index) => (
        <div
          className="card w-96 bg-base-100 shadow-xl image-full cursor-pointer"
          key={index}
        >
          <figure>
            <Image src={card.image} alt={card.title} width={800} height={500} />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{card.title}</h2>
          </div>
        </div>
      ))}
    </div>
  )
}
