import React from "react";
import { Lineicons } from "@lineiconshq/react-lineicons";
import {
  Home2Outlined,
  Cart1Outlined,
  User4Outlined,
  Search1Outlined,
  HeartOutlined,
  HeartSolid,
  PlusOutlined,
  MinusOutlined,
  CheckOutlined,
  CheckCircle1Outlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  ChevronUpOutlined,
  ChevronDownOutlined,
  Trash3Outlined,
  EyeOutlined,
  PhoneOutlined,
  Envelope1Outlined,
  MapMarker1Outlined,
  Shield2CheckOutlined,
  Headphone1Outlined,
  CalendarDaysOutlined,
  Diamonds1Outlined,
  InstagramOutlined,
  TelegramOutlined,
  WhatsappOutlined,
  QuestionMarkCircleOutlined,
  BricksOutlined,
  TruckDelivery1Outlined,
  StarFatBulk,
} from "@lineiconshq/free-icons";

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
  strokeWidth?: number;
}

const iconMap: Record<string, any> = {
  home: Home2Outlined,
  "shopping-cart": Cart1Outlined,
  user: User4Outlined,
  search: Search1Outlined,
  heart: HeartOutlined,
  "heart-filled": HeartSolid,
  plus: PlusOutlined,
  minus: MinusOutlined,
  checkmark: CheckOutlined,
  "checkmark-circle": CheckCircle1Outlined,
  "arrow-left": ArrowLeftOutlined,
  "arrow-right": ArrowRightOutlined,
  "chevron-up": ChevronUpOutlined,
  "chevron-down": ChevronDownOutlined,
  trash: Trash3Outlined,
  eye: EyeOutlined,
  phone: PhoneOutlined,
  envelope: Envelope1Outlined,
  "map-marker": MapMarker1Outlined,
  "shield-check": Shield2CheckOutlined,
  headphone: Headphone1Outlined,
  calendar: CalendarDaysOutlined,
  diamond: Diamonds1Outlined,
  instagram: InstagramOutlined,
  telegram: TelegramOutlined,
  whatsapp: WhatsappOutlined,
  "help-circle": QuestionMarkCircleOutlined,
  store: BricksOutlined,
  truck: TruckDelivery1Outlined,
  "star-filled": StarFatBulk,
};

const Icon: React.FC<IconProps> = ({ name, size = 24, color, className, strokeWidth = 1.5 }) => {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in iconMap`);
    return null;
  }

  return (
    <Lineicons
      icon={IconComponent}
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      className={className}
    />
  );
};

export { Icon };
