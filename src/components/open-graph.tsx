import { ImageResponse } from "next/og";
export const alt = "TranslateWala — Indian language translation for the GCC and beyond.";
export const size = {width:1200,height:630};
export const contentType = "image/png";
export default function OpenGraphImage(){
  return new ImageResponse(<div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",background:"#f3f6fc",padding:"65px 75px",color:"#14253e",fontFamily:"sans-serif"}}><div style={{display:"flex",alignItems:"center",fontSize:35,fontWeight:700}}><span style={{color:"#ed3027"}}>Translate</span><span style={{color:"#2064db"}}>Wala</span><span style={{marginLeft:"auto",fontSize:15,fontWeight:400,color:"#738299"}}>INDIAN ROOTS. GLOBAL REACH.</span></div><div style={{display:"flex",flexDirection:"column",marginTop:65,fontSize:72,lineHeight:1.13,fontWeight:700,letterSpacing:-3}}><span>Indian language</span><span>translation for the</span><span style={{color:"#2164db"}}>GCC & beyond.</span></div><div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:"auto",paddingTop:25,borderTop:"1px solid #d9e3f3",fontSize:16,color:"#657b98"}}><span>UAE · Saudi Arabia · Qatar · Kuwait · Oman · Bahrain</span><span style={{color:"#2164db"}}>translatewala.com</span></div></div>,size);
}
