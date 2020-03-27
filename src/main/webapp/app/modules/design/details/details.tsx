import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Row, Table} from 'reactstrap';
import {getSortState, JhiItemCount, JhiPagination, Translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ITEMS_PER_PAGE} from 'app/shared/util/pagination.constants';
import {getDesigns} from 'app/modules/design/details/details.reducer';
import {IRootState} from 'app/shared/reducers';

export interface IDesignsPageProps extends StateProps, DispatchProps, RouteComponentProps<{}> {
}

export const DesignsPage = (props: IDesignsPageProps) => {
  const [pagination, setPagination] = useState(getSortState(props.location, ITEMS_PER_PAGE));

  useEffect(() => {
    props.getDesigns(pagination.activePage - 1, pagination.itemsPerPage, `${pagination.sort},${pagination.order}`);
    props.history.push(`${props.location.pathname}?page=${pagination.activePage}&sort=${pagination.sort},${pagination.order}`);
  }, [pagination]);

  const sort = p => () =>
    setPagination({
      ...pagination,
      order: pagination.order === 'asc' ? 'desc' : 'asc',
      sort: p
    });

  const handlePagination = currentPage =>
    setPagination({
      ...pagination,
      activePage: currentPage
    });

  const {designs, match, totalItems} = props;
  return (
    <div>
      <h2 id="designs-page-heading">
        <Translate contentKey="design.home.title">Designs</Translate>
        <Link to={`${match.url}/create`} className="btn btn-primary float-right jh-create-entity">
          <FontAwesomeIcon icon="plus"/> <Translate contentKey="design.create.label">Create a new
          design</Translate>
        </Link>
      </h2>
      <Table responsive striped>
        <thead>
        <tr>
          <th className="hand" onClick={sort('name')}>
            <Translate contentKey="design.name">Login</Translate>
            <FontAwesomeIcon icon="sort"/>
          </th>
          <th className="hand" onClick={sort('username')}>
            <Translate contentKey="design.username">Username</Translate>
            <FontAwesomeIcon icon="sort"/>
          </th>
          <th/>
        </tr>
        </thead>
        <tbody>
        {designs.map((design, i) => (
          <tr id={design.name} key={`design-${i}`}>
            <td>{design.name}</td>
            <td>{design.username}</td>
            <td className="text-right">
              <div className="btn-group flex-btn-group-container">
                <Button tag={Link} to={`${match.url}/${design.id}`} color="info" size="sm">
                  <FontAwesomeIcon icon="eye"/>{' '}
                  <span className="d-none d-md-inline">
                      <Translate contentKey="entity.action.view">View</Translate>
                    </span>
                </Button>
              </div>
            </td>
          </tr>
        ))}
        </tbody>
      </Table>
      <div className={designs && designs.length > 0 ? '' : 'd-none'}>
        <Row className="justify-content-center">
          <JhiItemCount page={pagination.activePage} total={totalItems} itemsPerPage={pagination.itemsPerPage}
                        i18nEnabled/>
        </Row>
        <Row className="justify-content-center">
          <JhiPagination
            activePage={pagination.activePage}
            onSelect={handlePagination}
            maxButtons={5}
            itemsPerPage={pagination.itemsPerPage}
            totalItems={props.totalItems}
          />
        </Row>
      </div>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  designs: storeState.design.designs,
  totalItems: storeState.design.totalItems
});

const mapDispatchToProps = {getDesigns};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DesignsPage);
