import { useState, useRef, useCallback, useEffect } from 'react';
import { X } from 'lucide-react';
import {
  useFloating,
  useInteractions,
  useClick,
  useDismiss,
  useRole,
  FloatingFocusManager,
  FloatingPortal,
  flip,
  shift,
  offset
} from '@floating-ui/react';

interface TokenOption {
  value: string;
  label: string;
  color?: string;
  avatar?: string;
  description?: string;
}

interface TokenSelectProps {
  options: TokenOption[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  multiple?: boolean;
}

export function TokenSelect({
  options,
  selectedValues,
  onChange,
  placeholder = 'Select options...',
  multiple = true
}: TokenSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(4), flip(), shift()],
  });

  const click = useClick(context);
  const dismiss = useDismiss(context, {
    outsidePress: true,
  });
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const handleTokenRemove = (valueToRemove: string) => {
    onChange(selectedValues.filter(value => value !== valueToRemove));
  };

  const handleOptionSelect = (value: string) => {
    if (!multiple) {
      onChange([value]);
      setIsOpen(false);
      return;
    }

    if (selectedValues.includes(value)) {
      handleTokenRemove(value);
    } else {
      onChange([...selectedValues, value]);
    }
    setSearchTerm('');
    inputRef.current?.focus();
  };

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    option.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !searchTerm && selectedValues.length > 0) {
      handleTokenRemove(selectedValues[selectedValues.length - 1]);
    }
  }, [searchTerm, selectedValues]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div className="relative">
      <div
        ref={refs.setReference}
        {...getReferenceProps()}
        className="min-h-[2.5rem] w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-1 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 cursor-text"
        onClick={() => {
          setIsOpen(true);
          inputRef.current?.focus();
        }}
      >
        <div className="flex flex-wrap gap-1">
          {selectedValues.map(value => {
            const option = options.find(opt => opt.value === value);
            if (!option) return null;
            
            return (
              <span
                key={value}
                className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-sm"
                style={{
                  backgroundColor: option.color ? `#${option.color}20` : '#e5e7eb',
                  color: option.color ? `#${option.color}` : '#374151',
                }}
              >
                {option.avatar && (
                  <img
                    src={option.avatar}
                    alt={option.label}
                    className="w-4 h-4 rounded-full"
                  />
                )}
                {option.label}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTokenRemove(value);
                  }}
                  className="rounded-full p-0.5 hover:bg-black/10 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            );
          })}
          <input
            ref={inputRef}
            type="text"
            className="flex-1 min-w-[80px] bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={selectedValues.length === 0 ? placeholder : ''}
          />
        </div>
      </div>

      {isOpen && (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={false}>
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
              className="z-50 w-[var(--floating-target-width)] max-h-[300px] overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
            >
              {filteredOptions.length === 0 ? (
                <div className="p-2 text-sm text-gray-500 dark:text-gray-400">
                  No options found
                </div>
              ) : (
                <div className="p-1">
                  {filteredOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => handleOptionSelect(option.value)}
                      className={`flex w-full items-center gap-2 rounded-md px-4 py-2 text-sm ${
                        selectedValues.includes(option.value)
                          ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-200'
                          : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {option.avatar && (
                        <img
                          src={option.avatar}
                          alt={option.label}
                          className="w-6 h-6 rounded-full"
                        />
                      )}
                      <div className="flex flex-col items-start">
                        <span>{option.label}</span>
                        {option.description && (
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {option.description}
                          </span>
                        )}
                      </div>
                      {selectedValues.includes(option.value) && (
                        <span className="ml-auto text-blue-600 dark:text-blue-400">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </div>
  );
}