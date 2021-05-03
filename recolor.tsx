import { ChangeEvent, useEffect, useRef, useState } from "react";

const svgFile = `
<svg width="110" height="38" viewBox="0 0 110 38" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M41.7767 16.1446V7.11125H36V32.7231H41.7767V30.0235C42.8239 31.7194 44.817 33 47.5871 33C52.2152 33 55.8975 29.1236 55.8975 23.0321C55.8975 16.9407 52.249 13.1335 47.5871 13.1335C44.8846 13.1335 42.8239 14.4141 41.7767 16.1446ZM50.0194 23.0321C50.0194 26.1125 48.0601 27.843 45.8643 27.843C43.7022 27.843 41.7429 26.1471 41.7429 23.0667C41.7429 19.9864 43.7022 18.2905 45.8643 18.2905C48.0601 18.2905 50.0194 19.9518 50.0194 23.0321Z" fill="black"/>
<path d="M64.7047 23.759C64.7047 20.4363 66.2925 19.4672 69.0288 19.4672H70.6165V13.2027C68.0829 13.2027 66.0222 14.5871 64.7047 16.6292V13.4104H58.928V32.7231H64.7047V23.759Z" fill="black"/>
<path d="M73.3777 32.7231H79.1544V13.4104H73.3777V32.7231ZM76.2829 11.403C78.3098 11.403 79.6949 9.98393 79.6949 8.21879C79.6949 6.41904 78.3098 5 76.2829 5C74.2222 5 72.8372 6.41904 72.8372 8.21879C72.8372 9.98393 74.2222 11.403 76.2829 11.403Z" fill="black"/>
<path d="M83.3406 32.7231H89.1173V24.6242L94.8602 32.7231H102.022L94.117 23.1014L101.954 13.4104H94.8264L89.1173 21.267V7.11125H83.3406V32.7231Z" fill="black"/>
<path d="M104.223 32.7231H110V7.11125H104.223V32.7231Z" fill="black"/>
<path d="M5.8716 31.0583L11.7113 27.6037V20.6947L5.8716 17.2402L0 20.6947V27.6037L5.8716 31.0583Z" fill="#5BCBF0"/>
<path d="M11.6797 34.5127L17.5513 31.0909L17.5833 24.1492L11.7116 20.6946L5.84002 24.1166L5.80811 31.0582L11.6797 34.5127Z" fill="#77C696"/>
<path d="M23.4234 34.5778L29.295 31.1232L29.3269 24.2142L23.4553 20.7271L17.5837 24.1816L17.5518 31.0907L23.4234 34.5778Z" fill="#FCD63C"/>
<path d="M17.5508 38L23.4224 34.5782V27.6365L17.5827 24.1494L11.7111 27.6039L11.6792 34.5129L17.5508 38Z" fill="#ED1D69"/>
<path d="M23.4232 27.6361L29.2948 24.2142L29.3267 17.2725L23.4551 13.7854L17.5835 17.2399V24.1815L23.4232 27.6361Z" fill="#B23566"/>
<path d="M11.7432 13.8181L17.6148 10.3636V3.45454L11.7432 0L5.87158 3.45454V10.3636L11.7432 13.8181Z" fill="#FCD63C"/>
<path d="M17.6148 17.2725L23.4545 13.818V6.90895L17.6148 3.45441L11.7432 6.90895V13.818L17.6148 17.2725Z" fill="#77C696"/>
<path d="M23.4539 20.7273L29.3256 17.2728V10.3638L23.4539 6.90924L17.6143 10.3638V17.2728L23.4539 20.7273Z" fill="#5BCBF0"/>
<path d="M5.8716 24.1492L11.7113 20.6946V13.7856L5.8716 10.3311L0 13.7856V20.6946L5.8716 24.1492Z" fill="#B23566"/>
<path d="M5.90286 17.2725L11.7426 13.818V6.90895L5.90286 3.45441L0.03125 6.90895V13.818L5.90286 17.2725Z" fill="#ED1D69"/>
</svg>
`;

interface IProcessSvg {
  svgDom: HTMLDivElement;
  setCurrentZoneId: (id: string) => void;
  setCurrentZoneColor: (id: string) => void;
}

const componentToHex = (c: number) => {
  var hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
};

const rgbToHex = (r: number, g: number, b: number) => {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};

const processSvg = ({
  svgDom,
  setCurrentZoneColor,
  setCurrentZoneId,
}: IProcessSvg) => {
  const listTagName = svgDom.getElementsByTagName("*");
  for (let i = 0; i < listTagName.length; i++) {
    listTagName[i].id = `color-id-${i}`;
    if (listTagName[i].childElementCount === 0) {
      listTagName[i].addEventListener("click", () => {
        const { fill } = getComputedStyle(listTagName[i]);
        const [red, green, blue] = fill
          .replace(/rgb|\(|\)/g, "")
          .split(",")
          .map(Number);
        setCurrentZoneColor(rgbToHex(red, green, blue));
        setCurrentZoneId(listTagName[i].id);
      });
    }
  }
};

const App = () => {
  const svgRef = useRef<HTMLDivElement>();
  const parser = new DOMParser();
  const [currentZoneId, setCurrentZoneId] = useState<string>();
  const [hexColor, setHexColor] = useState<string>("#ffffff");

  console.log("currentZoneId", currentZoneId);

  const onChangeHexColor = (e: ChangeEvent<HTMLInputElement>) => {
    setHexColor(e.target.value);
  };

  const onChangeColorCurrentZone = () => {
    const currentZone = document.getElementById(currentZoneId as string);
    currentZone?.setAttribute("fill", hexColor);
  };

  useEffect(() => {
    if (!svgRef.current) return;

    const svgDom = parser.parseFromString(svgFile, "image/svg+xml");
    console.log("svgDom", svgDom);
    svgRef.current.innerHTML = svgFile;
    processSvg({
      svgDom: svgRef.current,
      setCurrentZoneColor: setHexColor,
      setCurrentZoneId,
    });
  }, [svgFile]);

  return (
    <>
      <p>currentZone Id: {currentZoneId}</p>
      <input type="color" value={hexColor} onChange={onChangeHexColor} />
      <button onClick={onChangeColorCurrentZone}>
        set color on currentZone
      </button>
      <div ref={svgRef as any}></div>
    </>
  );
};

export default App;
