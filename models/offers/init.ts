import axios from "axios"
import { $offer, $offers, getAllOffersFx, getOneOfferFx, switchIsLoading, setIsLoadingFx } from "."

const endpoint = `https://lilac-test.gb-game.ru/api`

getAllOffersFx.use(async () => {
    const response = await axios.get(`${endpoint}/offers`)
    return response.data
})

getOneOfferFx.use(async (guid: string) => {
    const response = await axios.get(`${endpoint}/catalog/getbyid?id=${guid}`)
    return response.data
})

$offer.on(getOneOfferFx.doneData, (_, response) => response.data)
$offers.on(getAllOffersFx.doneData, (_, response) => response.data)
