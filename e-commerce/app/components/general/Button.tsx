import { IconType } from 'react-icons'

interface ButtonProps {
    text: string
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
    // React.MouseEvent<HTMLButtonElement> burada onClick in ozelligini vermis olduk, tag icerisinde olmadigi icin onClick in hangi ozelligi almasi gerektigini soyluyoruz
    // Yani onClick e kendi ozelligini vermis oluyoruz interface icerisinde.
    small?: boolean
    outline?: boolean
    // icon:IconType
    disabled?: boolean
    // burada ?: kullanmak bize props olarak gonderdigimiz tarafta hic gondermeme gibi bir firsat sunuyor yani propslari gonderdigimiz component de 
    // yalnizca text ve onclick gondermemiz yeterli olacaktir, 
    // yukarida boolean tip verdigimiz degiskenler props olarak atilirken ornegin small direkt olarak atilabilir <Button small/> seklinde .
}

const Button: React.FC<ButtonProps> = ({ text, onClick, small, outline, disabled }) => {
    return (
        <button disabled={disabled} className={`rounded-lg p-3 ${small ? "w-[250px]" : "w-full"} ${outline ? "border text-black" : "bg-black text-white"}`} onClick={onClick}>
            {text}
        </button>
    )
}

export default Button