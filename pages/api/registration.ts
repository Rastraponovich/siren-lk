import { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"
import { IRegistration } from "@/types/users.types"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const values: IRegistration = req.body
    const request = await axios.post(`https://lilac.gb-game.ru/api/register`, { ...values })
    return res.status(200).json(request.data)
}
