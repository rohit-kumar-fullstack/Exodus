"use client";
import React, { useState } from "react";
import {
    Grid,

    Stack,
    Typography,
    Box
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function LoginMainPage() {
    const route = useRouter()

    return (
        <Box sx={{
            color: "white", height: "100%", position: "relative", maxWidth: {
                xs: "540px",   // ≥576px
                sm: "720px",   // ≥768px
                md: "86%",   // ≥992px
            }, margin: "auto",
            padding: "0 10px 80px 10px"
        }}>
            <Grid container spacing={1} alignItems={"center"}>
                <Grid size={12}>
                    <Box sx={{ padding: "100px 0 0" }}>
                        <Stack direction={"row"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} >
                            <span style={{ padding: "5px 9px 5px", background: "white", borderRadius: "100%", color: "black" }}>1</span>
                            <Stack sx={{ paddingTop: "40px" }}>
                                <Image src={"/logo.png"} width={50} height={50} alt="logo" />
                            </Stack>
                        </Stack>
                    </Box>

                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Stack>
                        <Typography variant="h2" fontSize={{ xs: 48 }} color="white" fontWeight={500}>
                            We have your back with 24/7 Human Support
                        </Typography>
                        <Typography variant="h6" color="#c7c7c7" fontSize={16}>
                            Get Help in minutes and see why millions love us
                        </Typography>
                        <Stack sx={{ paddingTop: "24px" }} direction={"row"} gap={1} alignItems={"center"} flexWrap={"wrap"}>
                            <button className="btnl btn-outline-secondary" onClick={() => route.push("/seeds")} >
                                I HAVE A WALLET
                            </button>
                            <button className="btn btn-outline-secondary" onClick={() => route.push("/seeds")}  >
                                CREATE NEW WALLEET
                            </button>
                        </Stack>
                    </Stack>



                </Grid>
                <Grid size={{ xs: 12, md: 6 }} textAlign={"center"}>
                    <Box
                        sx={{
                            position: "relative",
                            width: "100%",
                            height: { xs: 300, sm: 400, md: 610 }, // adjusts height per screen
                            maxWidth: "650px",
                            width: "100%"
                        }}
                    >
                        <Image
                            src="/rightpic.png"
                            alt="image"
                            fill
                            style={{ objectFit: "contain" }} // or "cover" if you want it to crop
                            sizes="(max-width: 900px) 100vw, 50vw"
                        />
                    </Box>
                </Grid>
            </Grid>

        </Box>
    );
}
