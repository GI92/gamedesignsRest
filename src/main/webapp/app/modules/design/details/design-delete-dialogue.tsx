import React, {useEffect} from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {Translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {deleteDesign, getDesign} from 'app/modules/design/details/details.reducer';
import {IRootState} from 'app/shared/reducers';
import {connect} from 'react-redux';

export interface IDesignDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

export const DesignDeleteDialog = (props: IDesignDeleteDialogProps) => {
  useEffect(() => {
    props.getDesign(props.match.params.id);
  }, []);

  const handleClose = event => {
    event.stopPropagation();
    props.history.push('/design/' + props.match.params.id);
  };

  const confirmDelete = () => {
    props.deleteDesign(props.match.params.id);
    props.history.push('/');
  };

  const {design} = props;

  const canEdit = props.isAuthenticated && (design.username === props.account.login);
  if (!canEdit) {
    props.history.push('/design/' + props.match.params.id);
  }

  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>
        <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody>
        <Translate contentKey="design.delete.question" interpolate={{name: design.name}}>
          Are you sure you want to delete this Design?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban"/>
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash"/>
          &nbsp;
          <Translate contentKey="entity.action.delete">Delete</Translate>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  design: storeState.design.design,
  isAuthenticated: storeState.authentication.isAuthenticated,
  account: storeState.authentication.account
});

const mapDispatchToProps = {getDesign, deleteDesign};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DesignDeleteDialog);
