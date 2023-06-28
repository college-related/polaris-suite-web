
interface ISelectProps {
    label: string;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    options: dynamicObjectString[];
    required?: boolean;
    disabled?: boolean;
    classes?: string;
    errors?: dynamicObjectString | null;
    [key: string]: any;
}

const Select = (props: ISelectProps) => {

    const { label, name, onChange, options, required, disabled, classes, errors, ...rest } = props;

  return (
    <div className={`${classes}`}>
        <label htmlFor={label} className="text-gray-700 font-bold font-quicksand">{label}</label>
        <select 
            name={name} 
            id={label} 
            disabled={disabled} 
            onChange={onChange} 
            className={`w-full p-3 rounded-sm border mt-2 ${(errors && errors.hasOwnProperty(name)) && 'border-red-500'} ${classes}`}
        >
            {options.map((option, index) => (
                <option key={index} value={option.value}>{option.name}</option>
            ))}
        </select>
        {(errors && errors.hasOwnProperty(name)) && (
            <p className="text-red-500 text-sm">{errors[name]}</p>
        )}
    </div>
  )
}

export default Select