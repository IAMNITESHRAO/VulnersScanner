'use client'
import { useSelector } from 'react-redux';
import Link from "next/link";
import { styled } from "@mui/material/styles";
import Image from "next/image";

const AuthLogo = () => {
  const customizer = useSelector((state) => state.customizer);
  const LinkStyled = styled(Link)(() => ({
    height: customizer.TopbarHeight,
    width: customizer.isCollapse ? "40px" : "180px",
    overflow: "hidden",
    display: "block",
  }));

  if (customizer.activeDir === "ltr") {
    return (
      <LinkStyled href="/auth/auth1/login">
        {customizer.activeMode === "dark" ? (
          <Image
          src={"/images/logos/dark-logo.svg"}
          alt="logo"
            height={customizer.TopbarHeight}
            width={174}
            priority
          />
        ) : (
          <Image
            src={"/images/logos/dark-logo.svg"}
            alt="logo"
            height={customizer.TopbarHeight}
            width={174}
            priority
          />
        )}
      </LinkStyled>
    );
  }

  // return (
  //   <LinkStyled href="/">
  //     {customizer.activeMode === "dark" ? (
  //       <Image
  //         src="/images/logos/dark-rtl-logo.svg"
  //         alt="logo"
  //         height={customizer.TopbarHeight}
  //         width={174}
  //         priority
  //       />
  //     ) : (
  //       <Image
  //         src="/images/logos/light-logo-rtl.svg"
  //         alt="logo"
  //         height={customizer.TopbarHeight}
  //         width={174}
  //         priority
  //       />
  //     )}
  //   </LinkStyled>
  // );
};

export default AuthLogo;
