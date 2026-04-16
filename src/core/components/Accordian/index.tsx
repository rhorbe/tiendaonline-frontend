import { useEffect } from 'react';

interface CustomAccordionProps {
    title: string;
    content: React.ReactNode; // This allows you to pass any React node as content
    id: string;
}

const CustomAccordion = ({ title, content, id }: CustomAccordionProps) => {
    useEffect(() => {
        let isMounted = true;

        const initAccordion = async () => {
            const accordionEl = document.getElementById(`accordion-flush-${id}`);
            const triggerEl = document.querySelector(`[data-accordion-target="#accordion-flush-body-${id}"]`) as HTMLElement;
            const targetEl = document.getElementById(`accordion-flush-body-${id}`) as HTMLElement;

            if (!accordionEl || !triggerEl || !targetEl || !isMounted) {
                return;
            }

            const { Accordion } = await import('flowbite');

            if (!isMounted) {
                return;
            }

            new Accordion(accordionEl, [{
                id: `accordion-flush-body-${id}`,
                triggerEl,
                targetEl,
                active: false,
            }], {
                alwaysOpen: false,
                activeClasses: 'bg-white text-app-black',
                inactiveClasses: 'text-app-gray',
            });
        };

        void initAccordion();

        return () => {
            isMounted = false;
        };
    }, [id]);

    return (
        <div
            id={`accordion-flush-${id}`}
            data-accordion="collapse"
            data-active-classes="bg-white text-app-black "
            data-inactive-classes="text-app-gray"
        >
            <h2 id={`accordion-flush-heading-${id}`}>
                <button
                    type="button"
                    className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-app-gray border-b border-app-black gap-3"
                    data-accordion-target={`#accordion-flush-body-${id}`}
                    aria-expanded="false"
                    aria-controls={`accordion-flush-body-${id}`}
                >
                    <span>{title}</span>
                    <svg
                        data-accordion-icon
                        className="w-3 h-3 rotate-180 shrink-0"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                    >
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                    </svg>
                </button>
            </h2>
            <div id={`accordion-flush-body-${id}`} className="hidden" aria-labelledby={`accordion-flush-heading-${id}`}>
                <div className="py-5">
                    {/* Render the passed content prop dynamically */}
                    {content}
                </div>
            </div>
        </div>
    );
};

export default CustomAccordion;
