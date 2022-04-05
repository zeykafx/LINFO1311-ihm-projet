export const UploadImage = (req, res, next) => {
    console.log(req.file);
    res.send(JSON.stringify({status: "accepted", error: null}));
}