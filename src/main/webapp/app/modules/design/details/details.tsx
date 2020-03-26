import React, {useEffect} from 'react';
import {Button, Col, Row} from 'reactstrap';
import {connect} from 'react-redux';
import {Translate, translate} from 'react-jhipster';
import {AvField, AvForm} from 'availity-reactstrap-validation';
import {IRootState} from 'app/shared/reducers';
import {getSession} from 'app/shared/reducers/authentication';
import {RouteComponentProps} from 'react-router-dom';
import {getDesign, reset} from 'app/modules/design/details/details.reducer';

export interface IDesignDetailsProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

export const DetailsPage = (props: IDesignDetailsProps) => {

  useEffect(() => {
    props.getDesign(props.match.params.id);
  }, []);

  const {design} = props;

  // Add rows to textarea
  const handleDescriptionChange = () => {
    const textArea = document.querySelector('textarea');
    if (textArea.clientHeight < textArea.scrollHeight) {
      textArea.rows = textArea.rows + 1;
    }
  };

  return (
    <div>
      <h2 id="design-title">
        <Translate contentKey="design.detail.name" interpolate={{name: design.name}}/>
      </h2>
      <AvForm/>
      <Row className="justify-content-between">
        <Col md="8">
          <AvForm>
            <AvField
              type="textarea"
              name="description"
              rows="10"
              label={translate('design.form.description.label')}
              placeholder={translate('design.form.description.placeholder')}
              value={design.description}
              onChange={handleDescriptionChange}
              validate={{
                required: {value: true, errorMessage: translate('design.messages.validate.description.required')}
              }}
            />
            <Button id="create-submit" color="primary" type="submit">
              <Translate contentKey="design.form.button.update">Create</Translate>
            </Button>
          </AvForm>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = ({authentication, design}: IRootState) => ({
  account: authentication.account,
  isAuthenticated: authentication.isAuthenticated,
  design: design.design
});

const mapDispatchToProps = {getSession, getDesign, reset};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DetailsPage)
