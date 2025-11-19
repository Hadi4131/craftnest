import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQSection() {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-lg font-medium text-slate-900">How long does shipping take?</AccordionTrigger>
          <AccordionContent className="text-slate-600">
            Domestic orders usually arrive within 3-5 business days. International orders may take 7-14 days depending on customs.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-lg font-medium text-slate-900">Are your materials sustainable?</AccordionTrigger>
          <AccordionContent className="text-slate-600">
            Yes! We use 100% organic cotton for our apparel and recycled packaging materials for all shipments.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-lg font-medium text-slate-900">What is your return policy?</AccordionTrigger>
          <AccordionContent className="text-slate-600">
            We offer a 30-day "Love It or Return It" guarantee. If you're not satisfied, we'll cover the return shipping.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger className="text-lg font-medium text-slate-900">Do you offer custom designs?</AccordionTrigger>
          <AccordionContent className="text-slate-600">
            We do! Check out our "Maker" pricing plan for access to our custom design studio tools.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
