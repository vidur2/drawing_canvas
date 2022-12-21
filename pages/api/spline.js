// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const URI = "http://172.20.10.10:5001/";

export default function handler(req, res) {
  const { body } = req;
  // const { a, b, type } = body;
  fetch(URI, {
      method: "POST",
      body: JSON.stringify(body)
    })
  res.status(200).json({ processing: true })
}
