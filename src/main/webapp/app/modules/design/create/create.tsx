import React from 'react';
import {Button, Col, Row} from 'reactstrap';
import {connect} from 'react-redux';
import {Translate, translate} from 'react-jhipster';
import {AvField, AvForm} from 'availity-reactstrap-validation';
import {IRootState} from 'app/shared/reducers';
import {getSession} from 'app/shared/reducers/authentication';
import {handleCreate, reset} from "app/modules/design/create/create.reducer";

export interface IDesignCreateProps extends StateProps, DispatchProps {
}

export const CreatePage = (props: IDesignCreateProps) => {

  const handleValidSubmit = (event, values) => {
    props.handleCreate(values.name, values.description);
    event.preventDefault();
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h1 id="design-title">
            <Translate contentKey="design.create.title">Create design</Translate>
          </h1>
        </Col>
      </Row>
      <Row>
        <Col md="8">
          <AvForm id="register-form" onValidSubmit={handleValidSubmit}>
            <AvField
              name="name"
              label={translate('design.form.name.label')}
              placeholder={translate('design.form.name.placeholder')}
              validate={{
                required: {value: true, errorMessage: translate('design.messages.validate.name.required')},
                maxLength: {value: 100, errorMessage: translate('design.messages.validate.name.maxLength')}
              }}
            />
            <AvField
              name="description"
              label={translate('design.form.description.label')}
              placeholder={translate('design.form.description.placeholder')}
              validate={{
                required: {value: true, errorMessage: translate('design.messages.validate.description.required')}
              }}
            />
            <Button id="create-submit" color="primary" type="submit">
              <Translate contentKey="create.form.button">Create</Translate>
            </Button>
          </AvForm>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = ({authentication}: IRootState) => ({
  account: authentication.account,
  isAuthenticated: authentication.isAuthenticated
});

const mapDispatchToProps = {getSession, handleCreate, reset};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CreatePage)

