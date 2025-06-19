// 'use client';
// import React, { useState } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import { Box, CircularProgress } from "@mui/material";
// import { useRouter } from "next/navigation";

// const DozensCarousel = () => {
//     const router = useRouter();

//     const settings = {
//         dots: false,
//         arrows: false,
//         infinite: true,
//         autoplay: true,
//         autoplaySpeed: 0,
//         speed: 6000,
//         cssEase: 'linear', // smooth continuous scroll
//         slidesToShow: 4,
//         slidesToScroll: 1,
//         pauseOnHover: true,
//         responsive: [
//             {
//                 breakpoint: 1024,
//                 settings: {
//                     slidesToShow: 2,
//                     slidesToScroll: 1,
//                 }
//             },
//             {
//                 breakpoint: 480,
//                 settings: {
//                     slidesToShow: 1,
//                     slidesToScroll: 1
//                 }
//             }
//         ]
//     };

//     const internalPages = [
//         { title: 'Asset Management', path: '/dashboard/cloud-scan/asset-management' },
//         { title: 'Snyk Review', path: '/dashboard/secure-code-review/snyk' },
//         { title: 'Semgrep', path: '/dashboard/secure-code-review/semgrep' },
//         { title: 'Report', path: '/dashboard/secure-code-review/reports' },
//         // { title: 'nMap', path: '/dashboard/va/nMap' },
//     ];

//     return (
//         <Slider {...settings} className="dozenscarousel" style={{ marginLeft: '15px' }}>
//             {internalPages.map((page, index) => {
//                 const [isLoading, setIsLoading] = useState(true);

//                 return (
//                     <div key={index}>
//                         <Box
//                             onClick={() => router.push(page.path)}
//                             sx={{
//                                 width: 380,
//                                 height: 300,
//                                 borderRadius: "16px",
//                                 boxShadow: (theme) => theme.shadows[10],
//                                 overflow: 'hidden',
//                                 position: 'relative',
//                                 cursor: 'pointer',
//                                 transition: 'all 0.3s ease',
//                                 transform: 'scale(1)',
//                                 '&:hover': {
//                                     transform: 'scale(1.05) translateY(-5px)'
//                                 }
//                             }}
//                         >
//                             {isLoading && (
//                                 <Box
//                                     sx={{
//                                         position: 'absolute',
//                                         top: 0,
//                                         left: 0,
//                                         right: 0,
//                                         bottom: 0,
//                                         display: 'flex',
//                                         alignItems: 'center',
//                                         justifyContent: 'center',
//                                         backgroundColor: 'rgba(255, 255, 255, 0.6)',
//                                         zIndex: 10
//                                     }}
//                                 >
//                                     <CircularProgress />
//                                 </Box>
//                             )}

//                             {/* <iframe
//                                 src={page.path}
//                                 title={page.title}
//                                 width="100%"
//                                 height="100%"
//                                 onLoad={() => setIsLoading(false)}
//                                 style={{
//                                     border: 'none',
//                                     // pointerEvents: 'none',
//                                     // transform: 'scale(0.8)',
//                                     transformOrigin: 'top left'
//                                 }}
//                             /> */}
//                             <iframe
//                                 src={page.path}
//                                 title={page.title}
//                                 width="1000"
//                                 height="800"
//                                 onLoad={() => setIsLoading(false)}
//                                 style={{
//                                     border: 'none',
//                                     transform: 'scale(0.375)',
//                                     transformOrigin: 'top left',
//                                     pointerEvents: 'none'
//                                 }}
//                             />
//                         </Box>
//                     </div>
//                 );
//             })}
//         </Slider>
//     );
// };

// export default DozensCarousel;


'use client';
import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";

const DozensCarousel = () => {
    const router = useRouter();

    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 0,
        speed: 6000,
        cssEase: 'linear',
        slidesToShow: 4,
        slidesToScroll: 1,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const internalPages = [
        { title: 'Asset Management', path: '/dashboard/cloud-scan/asset-management' },
        { title: 'Snyk Review', path: '/dashboard/secure-code-review/snyk' },
        { title: 'Asset Management 2', path: '/dashboard/cloud-scan/asset-management' },
        {
            title: 'AWS Report',
            path: '/dashboard/cloud-scan/reports?cloudCategory=aws&asset=aws-nit-5-6&scan=8&scanEntryDate=2025-04-16%2015%3A46%3A05&framework=PCIV4&frameworkType=compliance'
        }
    ];

    return (
        <Box sx={{ overflow: 'hidden', width: '100%' }}>
            <style>
                {`
                    .dozenscarousel .slick-slide {
                        padding: 0 10px;
                        box-sizing: border-box;
                    }

                    .iframe-box {
                        transition: transform 0.3s ease;
                    }

                    .iframe-box:hover {
                        transform: scale(1.03);
                    }

                    .iframe-container iframe {
                        border: none;
                        width: 100%;
                        height: 100%;
                        display: block;
                    }
                `}
            </style>

            <Slider {...settings} className="dozenscarousel">
                {internalPages.map((page, index) => {
                    const [isLoading, setIsLoading] = useState(true);

                    return (
                        <div key={index}>
                            <Box
                                className="iframe-box"
                                onClick={() => router.push(page.path)}
                                sx={{
                                    width: '100%',
                                    height: { xs: 250, sm: 300, md: 350 },
                                    borderRadius: "16px",
                                    boxShadow: 6,
                                    overflow: 'hidden',
                                    position: 'relative',
                                    cursor: 'pointer',
                                    margin: 'auto'
                                }}
                            >
                                {isLoading && (
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: 'rgba(255, 255, 255, 0.6)',
                                            zIndex: 10
                                        }}
                                    >
                                        <CircularProgress />
                                    </Box>
                                )}

                                <Box className="iframe-container" sx={{ width: '100%', height: '100%' }}>
                                    <iframe
                                        src={page.path}
                                        title={page.title}
                                        onLoad={() => setIsLoading(false)}
                                    />
                                </Box>
                            </Box>
                        </div>
                    );
                })}
            </Slider>
        </Box>
    );
};

export default DozensCarousel;
