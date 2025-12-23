import * as React from "react"

import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"

type TierCard = {
  label: string
  title: string
  description: string
  image: string
  width?: number
  height?: number
}

type HeroCarouselProps = {
  tiers: TierCard[]
}

export default function HeroCarousel({ tiers }: HeroCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi | null>(null)

  React.useEffect(() => {
    if (!api) return
    const interval = window.setInterval(() => {
      api.scrollNext()
    }, 4000)

    return () => window.clearInterval(interval)
  }, [api])

  return (
    <div className="relative">
      <Carousel
        opts={{ align: "start", loop: true }}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent className="-ml-3">
          {tiers.map((tier) => (
            <CarouselItem key={tier.title} className="pl-3">
              <Card className="glass-panel py-0 text-slate-100">
                <CardContent className="p-4 sm:p-5">
                  <AspectRatio
                    ratio={4 / 3}
                    className="overflow-hidden rounded-xl border border-white/10 bg-white/5"
                  >
                    <img
                      src={tier.image}
                      alt={`${tier.title} tier card`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      width={tier.width}
                      height={tier.height}
                    />
                  </AspectRatio>
                  <div className="mt-4 space-y-2">
                    <p className="text-xs uppercase tracking-[0.3em] text-amber-200/80">
                      {tier.label}
                    </p>
                    <h3 className="text-lg font-semibold">{tier.title}</h3>
                    <p className="text-sm text-slate-300">
                      {tier.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          variant="ghost"
          size="icon-sm"
          className="left-2 top-1/2 border border-white/20 bg-white/10 text-white hover:bg-white/20"
        />
        <CarouselNext
          variant="ghost"
          size="icon-sm"
          className="right-2 top-1/2 border border-white/20 bg-white/10 text-white hover:bg-white/20"
        />
      </Carousel>
    </div>
  )
}
