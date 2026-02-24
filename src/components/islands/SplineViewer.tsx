import { useRef } from "react";
import Spline from "@splinetool/react-spline";

export default function SplineViewer() {
    const spline = useRef<any>(null);

    function onLoad(splineApp: any) {
        spline.current = splineApp;
    }

    return (
        <div className="relative w-full h-screen">
            <Spline
                scene="https://prod.spline.design/VG3XFeiaQtFZaSOq/scene.splinecode"
                onLoad={onLoad}
                className="w-full h-full"
            />
        </div>
    );
}
