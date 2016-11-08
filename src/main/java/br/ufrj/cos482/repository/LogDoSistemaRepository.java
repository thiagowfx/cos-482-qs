package br.ufrj.cos482.repository;

import br.ufrj.cos482.domain.LogDoSistema;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the LogDoSistema entity.
 */
@SuppressWarnings("unused")
public interface LogDoSistemaRepository extends JpaRepository<LogDoSistema,Long> {

}
