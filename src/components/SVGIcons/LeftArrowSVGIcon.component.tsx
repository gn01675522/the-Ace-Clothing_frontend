import type { FC } from "react";

type PropsType = {
  className: string;
};

const LeftArrowSVGIcon: FC<PropsType> = ({ className }) => {
  return (
    <svg
      className={className}
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width="100%"
      viewBox="0 0 512 512"
      enable-background="new 0 0 512 512"
      xmlSpace="preserve"
    >
      <path
        fill="#FFFFFF"
        opacity="0.000000"
        stroke="none"
        d="
M376.000000,513.000000 
   C251.026276,513.000000 126.052544,513.000000 1.039406,513.000000 
   C1.039406,342.395477 1.039406,171.790955 1.039406,1.093209 
   C171.568619,1.093209 342.137299,1.093209 512.853027,1.093209 
   C512.853027,171.666580 512.853027,342.333282 512.853027,513.000000 
   C468.244507,513.000000 423.587250,513.000000 378.535126,512.668640 
   C383.435791,507.089783 388.731354,501.842255 394.641876,495.985382 
   C314.738190,416.082733 235.014999,336.360535 154.864502,256.211060 
   C155.821365,255.372421 157.124191,254.355682 158.284180,253.196075 
   C235.345810,176.159180 312.395905,99.110756 389.447510,22.063845 
   C390.153534,21.357859 391.316528,20.749393 391.480194,19.937065 
   C391.798401,18.357401 392.241211,16.088646 391.426392,15.122678 
   C388.430908,11.571507 384.938385,8.440071 381.638458,5.145152 
   C377.025757,0.539412 376.961639,0.533727 372.210693,5.284787 
   C289.507629,87.989891 206.805374,170.695770 124.108055,253.406601 
   C122.966248,254.548584 121.889877,255.756012 120.143188,257.613098 
   C121.823914,258.935760 123.388863,259.929291 124.668457,261.208282 
   C207.274017,343.775665 289.857483,426.365143 372.430725,508.964813 
   C373.697937,510.232452 374.813629,511.651550 376.000000,513.000000 
z"
      />
      <path
        fill="#000000"
        opacity="1.000000"
        stroke="none"
        d="
M376.333313,513.000000 
   C374.813629,511.651550 373.697937,510.232452 372.430725,508.964813 
   C289.857483,426.365143 207.274017,343.775665 124.668457,261.208282 
   C123.388863,259.929291 121.823914,258.935760 120.143188,257.613098 
   C121.889877,255.756012 122.966248,254.548584 124.108055,253.406601 
   C206.805374,170.695770 289.507629,87.989891 372.210693,5.284787 
   C376.961639,0.533727 377.025757,0.539412 381.638458,5.145152 
   C384.938385,8.440071 388.430908,11.571507 391.426392,15.122678 
   C392.241211,16.088646 391.798401,18.357401 391.480194,19.937065 
   C391.316528,20.749393 390.153534,21.357859 389.447510,22.063845 
   C312.395905,99.110756 235.345810,176.159180 158.284180,253.196075 
   C157.124191,254.355682 155.821365,255.372421 154.864502,256.211060 
   C235.014999,336.360535 314.738190,416.082733 394.641876,495.985382 
   C388.731354,501.842255 383.435791,507.089783 378.070129,512.668640 
   C377.555542,513.000000 377.111115,513.000000 376.333313,513.000000 
z"
      />
    </svg>
  );
};

export default LeftArrowSVGIcon;