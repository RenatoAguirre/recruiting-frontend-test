import PropTypes from "prop-types";

export const DocumentPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  organization_id: PropTypes.string.isRequired,
  reference: PropTypes.string,
  status: PropTypes.string,
});

export const ModalPropTypes = {
  isOpen: PropTypes.bool.isRequired,
  onContinue: PropTypes.func.isRequired,
};

export const DocumentItemPropTypes = {
  document: DocumentPropType.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  referenceId: PropTypes.string,
};

export const ErrorStatePropTypes = {
  message: PropTypes.string.isRequired,
};
