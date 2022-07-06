import Link  from "next/link";
import { ReactElement, cloneElement} from "react";
import { LinkProps } from "@prismicio/react";
import { useRouter } from "next/router";

interface ActivelinkProps extends LinkProps{
    children:ReactElement;
    activeClassName:string;
}

export function Activelink ({children,activeClassName, ...rest}:ActivelinkProps) {
    const { asPath } = useRouter ()

    const className = asPath === rest.href
    ? activeClassName
    :'';

    return (
        <Link{...rest}>
        {cloneElement (children, {
            className,
        })}
        </Link>
    )
}