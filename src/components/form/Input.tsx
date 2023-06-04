
interface IInputProps {
    label: string;
    type?: "text" | "number" | "email" | "password" | "date" | "time";
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    classes?: string;
    errors?: dynamicObjectString | null;
    [key: string]: any;
}

const Input = ({ 
    label, 
    name,
    type="text", 
    value, 
    onChange, 
    placeholder="", 
    required=true, 
    disabled=false, 
    classes="", 
    errors=null,
    ...rest 
}: IInputProps) => {
  return (
    <div>
        <label htmlFor={name} className="text-gray-700 font-bold font-quicksand">{label}</label>
        <input 
            id={name}
            type={type}
            value={value}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            className={`w-full p-3 rounded-sm ${(errors && errors.hasOwnProperty(name)) && 'border border-red-500'} ${classes}`}
            {...rest}
        />
        {(errors && errors.hasOwnProperty(name)) && (
            <p className="text-red-500 text-sm">{errors[name]}</p>
        )}
    </div>
  )
}

export default Input