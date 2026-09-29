import activation from "../assets/showdown/client-activation.jpg"
import villages from "../assets/showdown/village-delay-counts.jpg"
import zone from "../assets/showdown/zone-payment-success.jpg"

export type Chart = {
  src: string
  width: number
  height: number
  alt: string
}

export type ChartId = "zone" | "activation" | "villages"

export const charts: Record<ChartId, Chart> = {
  zone: {
    src: zone,
    width: 1600,
    height: 897,
    alt: "Tableau bar chart of zone-level payment success rate: Sierra Nevada 0.81029, Default Cluster 0.78639, Manaure 0.77006, Alta Guajira 0.72251, above a map marking Manaure, Alta Guajira, and Sierra Nevada.",
  },
  activation: {
    src: activation,
    width: 1600,
    height: 897,
    alt: "Tableau pie chart of client activation status: 61.01% active and 38.99% inactive.",
  },
  villages: {
    src: villages,
    width: 1600,
    height: 899,
    alt: "Tableau bar chart of client counts by village, split into delayed and on-time clients and sorted by the number of delayed clients.",
  },
}

export const zoneRates = [
  { zone: "Sierra Nevada", rate: 81.029, compared: true },
  { zone: "Default Cluster", rate: 78.639, compared: false },
  { zone: "Manaure", rate: 77.006, compared: false },
  { zone: "Alta Guajira", rate: 72.251, compared: true },
]
