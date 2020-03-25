package com.gamedesigns.repository;

import com.gamedesigns.domain.Design;
import com.gamedesigns.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DesignRepository extends JpaRepository<Design, Long> {

    Page<Design> findAllByUser(User u, Pageable pageable);

    Design findByIdAndUser_Login(Long id, String username);
}
