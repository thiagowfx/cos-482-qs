package br.ufrj.cos482.repository;

import br.ufrj.cos482.domain.AlunoMestrado;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the AlunoMestrado entity.
 */
@SuppressWarnings("unused")
public interface AlunoMestradoRepository extends JpaRepository<AlunoMestrado,Long> {

}
