// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const { body } = req;
  const { a, b, type } = body;
  fetch("http://localhost:5001/", {
      method: "POST",
      body: JSON.stringify(body)
    })
  res.status(200).json({ processing: true })
}
