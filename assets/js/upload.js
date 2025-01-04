const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();

// Configuração do multer para salvar arquivos no diretório "uploads/"
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Diretório onde os arquivos serão armazenados
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, `${uniqueSuffix}-${file.originalname}`); // Nome do arquivo salvo
    },
});

const upload = multer({ storage });

// Endpoint para upload de arquivos
app.post("/upload", upload.single("file"), (req, res) => {
    try {
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: "Nenhum arquivo foi enviado!" });
        }

        res.json({
            message: "Arquivo enviado com sucesso!",
            filePath: path.join(__dirname, "uploads", file.filename),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao salvar o arquivo no servidor." });
    }
});

// Inicializa o servidor na porta 3000
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});

const fs = require("fs");

// Garante que a pasta "uploads/" exista
if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}
