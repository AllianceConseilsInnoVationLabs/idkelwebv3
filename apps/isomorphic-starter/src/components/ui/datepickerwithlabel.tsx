import React from 'react';
import DatePicker from '@/components/datepicker';

const DatePickerWithLabel = ({ label, placeholder, value, setValue, error }: any) => {
    return (
        <div className="flex flex-col">
            <p className="mb-1.5">{label}</p>
            <DatePicker
                selected={value} 
                onChange={(date: Date) => setValue(date)}
                placeholderText={placeholder}
                className={`${error && 'datepicker-error'}`}
            />

            {error && (
                <p className="text-red text-[13px] mt-0.5 rizzui-input-error-text">{error}</p>
            )}
        </div>
    )
}

export default DatePickerWithLabel